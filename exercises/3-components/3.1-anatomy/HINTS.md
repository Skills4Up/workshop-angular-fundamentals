# Guía de Implementación y Buenas Prácticas para Componentes

Esta guía proporciona consejos, patrones y soluciones para crear componentes efectivos en Angular, centrándose en buenas prácticas y evitando errores comunes.

## 🎯 Patrones recomendados para componentes

### 1. Componentes inteligentes vs. Componentes de presentación

Organiza tu aplicación usando este patrón para separar responsabilidades:

**Componentes inteligentes (o contenedores):**
- Obtienen y manipulan datos
- Contienen lógica de negocio
- Se comunican con servicios
- Coordinan componentes de presentación

```typescript
@Component({
  selector: 'app-user-dashboard',
  template: `
    <app-user-profile 
      [user]="currentUser" 
      (userUpdate)="updateUser($event)">
    </app-user-profile>
    <app-user-permissions 
      [permissions]="userPermissions"
      (permissionChange)="updatePermissions($event)">
    </app-user-permissions>
  `
})
export class UserDashboardComponent implements OnInit {
  currentUser: User;
  userPermissions: Permission[];
  
  constructor(private userService: UserService) {}
  
  ngOnInit() {
    this.loadUserData();
  }
  
  loadUserData() {
    this.userService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
      this.userPermissions = user.permissions;
    });
  }
  
  updateUser(userData: User) {
    this.userService.updateUser(userData).subscribe();
  }
  
  updatePermissions(permissions: Permission[]) {
    this.userService.updatePermissions(permissions).subscribe();
  }
}
```

**Componentes de presentación (o de UI):**
- Reciben datos mediante @Input()
- Emiten eventos mediante @Output()
- No dependen de servicios
- Se centran en la presentación y la interacción del usuario

```typescript
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  @Input() user: User;
  @Output() userUpdate = new EventEmitter<User>();
  
  onSaveClick() {
    this.userUpdate.emit(this.user);
  }
}
```

### 2. Componentes de un solo propósito

Cada componente debe tener una sola responsabilidad bien definida:

✅ **Correcto:**
```typescript
// Componente específico para mostrar información de un usuario
@Component({
  selector: 'app-user-info',
  template: `
    <div class="user-info">
      <h3>{{user.name}}</h3>
      <p>Email: {{user.email}}</p>
      <p>Role: {{user.role}}</p>
    </div>
  `
})
export class UserInfoComponent {
  @Input() user: User;
}
```

❌ **Incorrecto:**
```typescript
// Componente sobrecargado con múltiples responsabilidades
@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html'
})
export class UserPageComponent {
  users: User[] = [];
  selectedUser: User;
  isEditMode = false;
  
  // Lógica para listar usuarios
  // Lógica para mostrar detalles de usuario
  // Lógica para editar usuario
  // Lógica para eliminar usuario
  // Lógica para permisos de usuario
  // ...
}
```

## 💡 Mejores prácticas para el ciclo de vida

### Utiliza los hooks del ciclo de vida adecuadamente

```typescript
@Component({ /* ... */ })
export class DataComponent implements OnInit, OnChanges, OnDestroy {
  @Input() dataId: string;
  private subscription: Subscription;
  
  constructor(private dataService: DataService) {
    // Usar SOLO para inyección de dependencias
    // NO realizar operaciones pesadas o asíncronas aquí
  }
  
  ngOnInit() {
    // Ideal para inicialización, llamadas a APIs
    this.loadData();
  }
  
  ngOnChanges(changes: SimpleChanges) {
    // Responder a cambios en las propiedades @Input
    if (changes['dataId'] && !changes['dataId'].firstChange) {
      this.loadData();
    }
  }
  
  ngOnDestroy() {
    // Limpieza para evitar memory leaks
    this.subscription.unsubscribe();
  }
  
  private loadData() {
    this.subscription = this.dataService.getData(this.dataId)
      .subscribe(/* ... */);
  }
}
```

### Orden de ejecución de los hooks

Conocer el orden ayuda a estructurar correctamente tu código:

1. `constructor`
2. `ngOnChanges` (antes de ngOnInit y cuando cambia un @Input)
3. `ngOnInit` (una vez, después del primer ngOnChanges)
4. `ngDoCheck` (después de ngOnChanges/ngOnInit, y durante cada ciclo de detección)
5. `ngAfterContentInit` (después de proyectar contenido)
6. `ngAfterContentChecked` (después de verificar contenido proyectado)
7. `ngAfterViewInit` (después de inicializar vistas)
8. `ngAfterViewChecked` (después de verificar vistas)
9. `ngOnDestroy` (justo antes de que Angular destruya el componente)

## 🧩 Comunicación entre componentes

### 1. De padres a hijos mediante @Input

```typescript
// Componente padre
@Component({
  selector: 'app-parent',
  template: `
    <app-child 
      [items]="parentItems"
      [config]="configuration">
    </app-child>
  `
})
export class ParentComponent {
  parentItems = ['Item 1', 'Item 2', 'Item 3'];
  configuration = { showHeader: true, editable: false };
}

// Componente hijo
@Component({
  selector: 'app-child',
  template: `
    <div *ngIf="config.showHeader">
      <h2>Items List</h2>
    </div>
    <ul>
      <li *ngFor="let item of items">{{item}}</li>
    </ul>
  `
})
export class ChildComponent {
  @Input() items: string[] = [];
  @Input() config: {showHeader: boolean, editable: boolean} = {
    showHeader: false,
    editable: false
  };
}
```

### 2. De hijos a padres mediante @Output

```typescript
// Componente hijo
@Component({
  selector: 'app-child',
  template: `
    <button (click)="onAddClick()">Add Item</button>
  `
})
export class ChildComponent {
  @Output() itemAdded = new EventEmitter<string>();
  
  onAddClick() {
    this.itemAdded.emit('New Item ' + Date.now());
  }
}

// Componente padre
@Component({
  selector: 'app-parent',
  template: `
    <app-child (itemAdded)="handleNewItem($event)"></app-child>
    <div>Latest item: {{latestItem}}</div>
  `
})
export class ParentComponent {
  latestItem = '';
  
  handleNewItem(item: string) {
    this.latestItem = item;
  }
}
```

### 3. Mediante servicios para componentes no relacionados

```typescript
// Servicio compartido
@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private messageSource = new BehaviorSubject<string>('Default message');
  currentMessage = this.messageSource.asObservable();
  
  changeMessage(message: string) {
    this.messageSource.next(message);
  }
}

// Componente emisor
@Component({
  selector: 'app-sender',
  template: `
    <input [(ngModel)]="message">
    <button (click)="sendMessage()">Send</button>
  `
})
export class SenderComponent {
  message = '';
  
  constructor(private dataService: SharedDataService) {}
  
  sendMessage() {
    this.dataService.changeMessage(this.message);
  }
}

// Componente receptor
@Component({
  selector: 'app-receiver',
  template: `<p>Received: {{message}}</p>`
})
export class ReceiverComponent implements OnInit, OnDestroy {
  message = '';
  private subscription: Subscription;
  
  constructor(private dataService: SharedDataService) {}
  
  ngOnInit() {
    this.subscription = this.dataService.currentMessage
      .subscribe(message => this.message = message);
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
```

## 🔍 Solución a problemas comunes

### 1. Problema: Detección de cambios ExpressionChangedAfterItHasBeenChecked

**Síntoma:** Error en la consola: "Expression has changed after it was checked"

**Causas:**
- Modificar datos durante el ciclo de detección de cambios
- Cambiar valores en ngAfterViewInit/ngAfterContentInit

**Soluciones:**
```typescript
// Opción 1: Usar setTimeout
ngAfterViewInit() {
  setTimeout(() => {
    this.isVisible = true;
  });
}

// Opción 2: Usar ChangeDetectorRef
constructor(private cd: ChangeDetectorRef) {}

ngAfterViewInit() {
  this.isVisible = true;
  this.cd.detectChanges();
}
```

### 2. Problema: Ciclos infinitos de detección de cambios

**Síntomas:**
- La aplicación se congela
- Error "Maximum update depth exceeded"

**Causas:**
- Cambios de estado que provocan más cambios de estado
- Eventos generados en cada ciclo de detección

**Soluciones:**
```typescript
// Evitar llamadas recursivas:
@Component({
  selector: 'app-example',
  template: `
    <div (click)="onClick()">Click me</div>
  `
})
export class ExampleComponent {
  onClick() {
    // No cambiar propiedades que puedan disparar otros eventos
    // this.isClicked = !this.isClicked; // Cuidado si esto genera más acciones
  }
}

// Considerar detección de cambios OnPush:
@Component({
  selector: 'app-optimized',
  templateUrl: './optimized.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptimizedComponent {
  // ...
}
```

### 3. Problema: Referencias circulares entre componentes

**Síntoma:** Error de compilación relacionado con dependencias circulares

**Soluciones:**
```typescript
// Opción 1: Usar un servicio compartido
@Injectable({ providedIn: 'root' })
export class CommunicationService {
  // Métodos para comunicación
}

// Opción 2: Usar forwardRef para inyección circular
import { forwardRef } from '@angular/core';

@Component({
  selector: 'app-component-a',
  providers: [
    { provide: ComponentB, useExisting: forwardRef(() => ComponentB) }
  ]
})
export class ComponentA { }
```

## 📊 Optimización de rendimiento

### 1. Usa ChangeDetectionStrategy.OnPush

```typescript
@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataListComponent {
  @Input() items: readonly Item[]; // Mejor usar inmutabilidad
  
  // El componente solo se actualizará cuando:
  // 1. Se reciba un nuevo valor por @Input()
  // 2. Se dispare un evento de un elemento en la plantilla
  // 3. Se llame manualmente a markForCheck() o detectChanges()
}
```

### 2. Implementa trackBy en ngFor

```typescript
@Component({
  selector: 'app-list',
  template: `
    <div *ngFor="let item of items; trackBy: trackByFn">
      {{item.name}}
    </div>
  `
})
export class ListComponent {
  @Input() items: Item[];
  
  trackByFn(index: number, item: Item): number {
    return item.id; // Usar un identificador único y estable
  }
}
```

### 3. Evita lógica compleja en templates

```typescript
// Evitar esto:
<div>{{ getComplicatedValue(item, index, someOtherValue) }}</div>

// Mejor hacer esto:
@Component({
  // ...
})
export class BetterComponent {
  processedValues: any[] = [];
  
  ngOnChanges() {
    this.processedValues = this.items.map(item => 
      this.getComplicatedValue(item)
    );
  }
}
// Y en el template:
<div *ngFor="let value of processedValues">{{ value }}</div>
```

## 📝 Lista de comprobación para componentes bien diseñados

✅ **Responsabilidad única**: El componente tiene un propósito claro y único
✅ **Separación de intereses**: Lógica de negocio en servicios, UI en componentes
✅ **Componentes pequeños**: Menos de 400 líneas de código (idealmente)
✅ **API del componente bien definida**: @Input() y @Output() claros 
✅ **Manejo de recursos**: Implementa OnDestroy para limpieza
✅ **Sin efectos secundarios**: Operaciones predecibles y explícitas
✅ **Inteligente o presentacional**: Clara separación de roles
✅ **Detección de cambios optimizada**: Usa OnPush cuando sea posible
✅ **Nombres significativos**: Selector, inputs y outputs con nombres claros
✅ **Componentes testeables**: Fáciles de probar unitariamente
