# Relaciones Padre-Hijo entre Componentes

En Angular, la relación padre-hijo entre componentes es un patrón fundamental que permite crear interfaces modulares y reutilizables. Esta relación se establece anidando el selector de un componente en el template de otro.

## 🧩 Fundamentos de la relación padre-hijo

Una relación padre-hijo se crea cuando:

1. Un componente (hijo) es incluido en el template de otro componente (padre)
2. El componente padre puede pasar datos al hijo mediante `@Input()`
3. El componente hijo puede notificar eventos al padre mediante `@Output()`

```typescript
// parent.component.ts
@Component({
  selector: 'app-parent',
  template: `
    <div class="parent">
      <h2>Parent Component</h2>
      <app-child [data]="parentData" (childEvent)="handleChildEvent($event)"></app-child>
    </div>
  `
})
export class ParentComponent {
  parentData = 'Data from parent';
  
  handleChildEvent(data: any) {
    console.log('Event from child:', data);
  }
}

// child.component.ts
@Component({
  selector: 'app-child',
  template: `
    <div class="child">
      <h3>Child Component</h3>
      <p>Received: {{ data }}</p>
      <button (click)="sendToParent()">Send to Parent</button>
    </div>
  `
})
export class ChildComponent {
  @Input() data: string;
  @Output() childEvent = new EventEmitter<string>();
  
  sendToParent() {
    this.childEvent.emit('Hello from child');
  }
}
```

## 📋 Comunicación de padres a hijos con @Input

Los componentes padres pueden pasar datos a sus hijos a través de propiedades de entrada (`@Input`).

### Definición en el componente hijo

```typescript
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  template: `
    <div class="profile-card">
      <h2>{{ name }}</h2>
      <p>Role: {{ role }}</p>
      <p *ngIf="isActive">Active User</p>
    </div>
  `
})
export class UserProfileComponent {
  @Input() name: string;
  @Input() role: string;
  @Input() isActive: boolean;
}
```

### Uso en el componente padre

```typescript
@Component({
  selector: 'app-user-dashboard',
  template: `
    <div class="dashboard">
      <h1>User Dashboard</h1>
      <app-user-profile
        [name]="currentUser.name"
        [role]="currentUser.role"
        [isActive]="currentUser.isActive">
      </app-user-profile>
    </div>
  `
})
export class UserDashboardComponent {
  currentUser = {
    name: 'Alice Smith',
    role: 'Admin',
    isActive: true
  };
}
```

### Propiedades @Input avanzadas

```typescript
export class FeatureComponent {
  // Input básico
  @Input() label: string;
  
  // Input con alias
  @Input('btnClass') buttonClass: string;
  
  // Input con transformación
  private _count = 0;
  
  @Input()
  set count(value: number) {
    this._count = value < 0 ? 0 : value; // Asegura valor no negativo
  }
  
  get count(): number {
    return this._count;
  }
  
  // Input con valor por defecto
  @Input() showHeader = true;
  
  // Input con propiedades requeridas (Angular 14+)
  @Input({ required: true }) id!: string;
}
```

## 🔄 Comunicación de hijos a padres con @Output

Los componentes hijos pueden enviar datos a sus padres mediante eventos (`@Output`).

### Definición en el componente hijo

```typescript
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: `
    <div class="counter">
      <p>Count: {{ count }}</p>
      <button (click)="increment()">+</button>
      <button (click)="decrement()">-</button>
      <button (click)="reset()">Reset</button>
    </div>
  `
})
export class CounterComponent {
  count = 0;
  
  @Output() countChanged = new EventEmitter<number>();
  @Output() resetEvent = new EventEmitter<void>();
  
  increment() {
    this.count++;
    this.countChanged.emit(this.count);
  }
  
  decrement() {
    if (this.count > 0) {
      this.count--;
      this.countChanged.emit(this.count);
    }
  }
  
  reset() {
    this.count = 0;
    this.countChanged.emit(this.count);
    this.resetEvent.emit();
  }
}
```

### Uso en el componente padre

```typescript
@Component({
  selector: 'app-game',
  template: `
    <div class="game">
      <h1>Game Score</h1>
      <p>Current score: {{ score }}</p>
      <app-counter 
        (countChanged)="updateScore($event)"
        (resetEvent)="onReset()">
      </app-counter>
    </div>
  `
})
export class GameComponent {
  score = 0;
  
  updateScore(newCount: number) {
    this.score = newCount;
    console.log('Score updated:', this.score);
  }
  
  onReset() {
    console.log('Counter was reset');
    // Lógica adicional...
  }
}
```

## 🔍 Accediendo a elementos hijos

### ViewChild

El decorador `@ViewChild` permite acceder directamente a un componente hijo desde el padre.

```typescript
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { TimerComponent } from './timer.component';

@Component({
  selector: 'app-stopwatch',
  template: `
    <div>
      <h2>Stopwatch</h2>
      <app-timer></app-timer>
      <button (click)="startTimer()">Start</button>
      <button (click)="stopTimer()">Stop</button>
    </div>
  `
})
export class StopwatchComponent implements AfterViewInit {
  @ViewChild(TimerComponent) timerComponent: TimerComponent;
  
  ngAfterViewInit() {
    // Importante: El componente hijo está disponible después de AfterViewInit
    console.log('Timer component:', this.timerComponent);
  }
  
  startTimer() {
    this.timerComponent.start();
  }
  
  stopTimer() {
    this.timerComponent.stop();
  }
}
```

### ViewChildren

El decorador `@ViewChildren` permite acceder a múltiples componentes hijos.

```typescript
import { Component, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { TabComponent } from './tab.component';

@Component({
  selector: 'app-tabs-container',
  template: `
    <div class="tabs-container">
      <app-tab title="Profile"></app-tab>
      <app-tab title="Settings"></app-tab>
      <app-tab title="Messages"></app-tab>
      
      <div class="tabs-buttons">
        <button (click)="selectTab(i)" *ngFor="let tab of tabs; let i = index">
          {{ tab.title }}
        </button>
      </div>
    </div>
  `
})
export class TabsContainerComponent implements AfterViewInit {
  @ViewChildren(TabComponent) tabComponents: QueryList<TabComponent>;
  tabs: TabComponent[] = [];
  
  ngAfterViewInit() {
    this.tabs = this.tabComponents.toArray();
    if (this.tabs.length > 0) {
      this.selectTab(0); // Selecciona la primera pestaña por defecto
    }
  }
  
  selectTab(index: number) {
    this.tabs.forEach(tab => tab.active = false);
    this.tabs[index].active = true;
  }
}
```

## 📊 Proyección de contenido con ng-content

La directiva `<ng-content>` permite que un componente padre proyecte contenido dentro de un componente hijo.

### Componente hijo con proyección simple

```typescript
// card.component.ts
@Component({
  selector: 'app-card',
  template: `
    <div class="card">
      <div class="card-header">
        <h3>{{ title }}</h3>
      </div>
      <div class="card-body">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [`
    .card {
      border: 1px solid #ddd;
      border-radius: 4px;
      padding: 15px;
      margin-bottom: 15px;
    }
    .card-header {
      border-bottom: 1px solid #eee;
      padding-bottom: 10px;
      margin-bottom: 10px;
    }
  `]
})
export class CardComponent {
  @Input() title: string;
}
```

### Uso de proyección en el componente padre

```typescript
@Component({
  selector: 'app-dashboard',
  template: `
    <app-card title="User Statistics">
      <p>Users registered: 1,245</p>
      <p>Active users: 753</p>
      <button>View Details</button>
    </app-card>
    
    <app-card title="Recent Activity">
      <ul>
        <li>John updated his profile</li>
        <li>Mary posted a new comment</li>
        <li>Steve uploaded a file</li>
      </ul>
    </app-card>
  `
})
export class DashboardComponent { }
```

### Proyección con múltiples slots

```typescript
// panel.component.ts
@Component({
  selector: 'app-panel',
  template: `
    <div class="panel">
      <div class="panel-header">
        <ng-content select="[header]"></ng-content>
      </div>
      <div class="panel-body">
        <ng-content></ng-content>
      </div>
      <div class="panel-footer">
        <ng-content select="[footer]"></ng-content>
      </div>
    </div>
  `
})
export class PanelComponent { }
```

```typescript
// usage-example.component.ts
@Component({
  selector: 'app-usage-example',
  template: `
    <app-panel>
      <div header>
        <h2>Custom Header</h2>
        <button>Close</button>
      </div>
      
      <p>This is the main content that goes into the default slot.</p>
      <p>It can contain multiple elements.</p>
      
      <div footer>
        <button>Save</button>
        <button>Cancel</button>
      </div>
    </app-panel>
  `
})
export class UsageExampleComponent { }
```

## 💡 Mejores prácticas para relaciones padre-hijo

1. **Maneja el flujo de datos unidireccional**: Datos hacia abajo con @Input, eventos hacia arriba con @Output

2. **Define APIs claras**: Limita los @Input y @Output a lo estrictamente necesario

3. **Evita ViewChild cuando sea posible**: Favorece @Input/@Output para mantener el desacoplamiento

4. **Utiliza OnChanges para reaccionar a cambios**:
   ```typescript
   ngOnChanges(changes: SimpleChanges) {
     if (changes.userData && !changes.userData.firstChange) {
       this.processUserData();
     }
   }
   ```

5. **Componentes hijos lo más independientes posible**: Deben funcionar con datos recibidos sin depender de la estructura del padre

6. **Evita mutaciones directas en los datos de entrada**:
   ```typescript
   // ❌ No óptimo: Modifica el objeto de entrada directamente
   @Input() user: User;
   updateUser() {
     this.user.name = 'New Name';
   }
   
   // ✅ Mejor: Emite un evento para que el padre actualice los datos
   @Input() user: User;
   @Output() userChange = new EventEmitter<User>();
   updateUser() {
     const updatedUser = { ...this.user, name: 'New Name' };
     this.userChange.emit(updatedUser);
   }
   ```

