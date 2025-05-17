# Creación Manual de Componentes en Angular

Aunque Angular CLI facilita la generación de componentes, crear componentes manualmente es útil para entender la estructura interna y tener más control sobre su implementación. Esta guía proporciona los pasos detallados para crear componentes desde cero.

## 🧩 Pasos para crear un componente manualmente

### 1. Crear los archivos del componente

Para un componente llamado "product-card", necesitarás crear:

```
src/app/product-card/
  ├── product-card.component.ts      # Clase del componente
  ├── product-card.component.html    # Template
  ├── product-card.component.css     # Estilos (opcional)
  └── product-card.component.spec.ts # Tests (opcional)
```

### 2. Implementar la clase del componente

```typescript
// product-card.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  // Propiedades
  product = {
    name: 'Sample Product',
    price: 99.99,
    description: 'This is a sample product description.'
  };
  
  // Métodos
  onBuyClick() {
    console.log('Buy button clicked for:', this.product.name);
  }
}
```

### 3. Crear el template HTML

```html
<!-- product-card.component.html -->
<div class="product-card">
  <h2>{{product.name}}</h2>
  <p class="price">${{product.price}}</p>
  <p class="description">{{product.description}}</p>
  <button (click)="onBuyClick()">Buy Now</button>
</div>
```

### 4. Definir los estilos CSS

```css
/* product-card.component.css */
.product-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  max-width: 300px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.price {
  font-weight: bold;
  color: #e63946;
}

.description {
  color: #666;
  font-size: 0.9em;
}

button {
  background-color: #457b9d;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #1d3557;
}
```

### 5. Declarar el componente en un módulo

```typescript
// app.module.ts (o el módulo correspondiente)
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ProductCardComponent } from './product-card/product-card.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductCardComponent // Declarar el componente aquí
  ],
  imports: [
    BrowserModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### 6. Usar el componente en una plantilla

```html
<!-- En alguna plantilla padre -->
<div class="container">
  <h1>Our Products</h1>
  <app-product-card></app-product-card>
</div>
```

## 🔄 Variantes en la creación manual

### Componente con template y estilos inline

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-alert',
  template: `
    <div class="alert" [class.alert-danger]="isError">
      <strong>{{title}}:</strong> {{message}}
      <button (click)="close()" class="close-btn">&times;</button>
    </div>
  `,
  styles: [`
    .alert {
      padding: 10px 15px;
      border-radius: 4px;
      background-color: #d4edda;
      border: 1px solid #c3e6cb;
      color: #155724;
      margin-bottom: 15px;
      position: relative;
    }
    
    .alert-danger {
      background-color: #f8d7da;
      border-color: #f5c6cb;
      color: #721c24;
    }
    
    .close-btn {
      position: absolute;
      top: 5px;
      right: 10px;
      cursor: pointer;
      background: transparent;
      border: none;
      font-size: 1.2rem;
    }
  `]
})
export class AlertComponent {
  title = 'Info';
  message = 'This is an alert message';
  isError = false;
  
  close() {
    console.log('Alert closed');
    // Lógica para cerrar la alerta
  }
}
```

### Componente con ViewEncapsulation

```typescript
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css'],
  encapsulation: ViewEncapsulation.None // Los estilos se aplicarán globalmente
})
export class ThemeComponent {
  // ...
}
```

### Componente con OnPush ChangeDetection

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PerformanceComponent {
  // ...
}
```

## 📝 Creación de un componente de prueba completo

Veamos el proceso completo para un componente llamado "counter":

### 1. Crear la estructura de carpetas y archivos

```
src/app/counter/
  ├── counter.component.ts
  ├── counter.component.html
  ├── counter.component.css
  └── counter.component.spec.ts
```

### 2. Implementar la clase

```typescript
// counter.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent {
  count = 0;
  
  increment() {
    this.count++;
  }
  
  decrement() {
    if (this.count > 0) {
      this.count--;
    }
  }
  
  reset() {
    this.count = 0;
  }
}
```

### 3. Crear el template

```html
<!-- counter.component.html -->
<div class="counter-container">
  <h2>Counter</h2>
  <div class="counter-value">{{ count }}</div>
  <div class="counter-controls">
    <button (click)="decrement()">-</button>
    <button (click)="reset()">Reset</button>
    <button (click)="increment()">+</button>
  </div>
</div>
```

### 4. Añadir estilos

```css
/* counter.component.css */
.counter-container {
  text-align: center;
  width: 200px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin: 20px auto;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.counter-value {
  font-size: 48px;
  font-weight: bold;
  margin: 20px 0;
}

.counter-controls button {
  padding: 8px 16px;
  margin: 0 5px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  font-size: 16px;
}

.counter-controls button:hover {
  background-color: #0069d9;
}

.counter-controls button:nth-child(2) {
  background-color: #6c757d;
}

.counter-controls button:nth-child(2):hover {
  background-color: #5a6268;
}
```

### 5. Añadir pruebas básicas

```typescript
// counter.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CounterComponent } from './counter.component';

describe('CounterComponent', () => {
  let component: CounterComponent;
  let fixture: ComponentFixture<CounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CounterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should increment count', () => {
    const initialCount = component.count;
    component.increment();
    expect(component.count).toBe(initialCount + 1);
  });

  it('should decrement count', () => {
    component.count = 5;
    component.decrement();
    expect(component.count).toBe(4);
  });

  it('should not decrement below zero', () => {
    component.count = 0;
    component.decrement();
    expect(component.count).toBe(0);
  });

  it('should reset count to zero', () => {
    component.count = 10;
    component.reset();
    expect(component.count).toBe(0);
  });
});
```

### 6. Registrar en el módulo

```typescript
// En el módulo correspondiente (app.module.ts o algún feature module)
import { CounterComponent } from './counter/counter.component';

@NgModule({
  declarations: [
    // ... otros componentes
    CounterComponent
  ],
  // ...
})
export class AppModule { }
```

## 💡 Ventajas de crear componentes manualmente

1. **Mayor comprensión** de la estructura interna de los componentes
2. **Control personalizado** sobre cada aspecto del componente
3. **Flexibilidad** para implementar patrones específicos
4. **Aprendizaje** más profundo de Angular

## ⚠️ Desventajas de la creación manual

1. **Más propenso a errores** de sintaxis o estructura
2. **Más tiempo** para implementar cada componente
3. **Menos consistencia** si diferentes desarrolladores crean componentes
4. **Sin actualización automática** del módulo

## 🔍 ¿Cuándo es preferible la creación manual?

- Durante el aprendizaje para entender la estructura de componentes
- Para componentes muy específicos o inusuales
- Si necesitas una personalización que el CLI no ofrece
- Para adaptar componentes existentes de otros proyectos

## 📚 Mínimo requerido para un componente

En su forma más básica, un componente Angular solo necesita:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-minimal',
  template: '<p>Minimal component</p>'
})
export class MinimalComponent { }
```

Y su declaración en un módulo:

```typescript
@NgModule({
  declarations: [MinimalComponent]
})
```

