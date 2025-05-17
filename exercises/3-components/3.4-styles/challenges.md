# Ejercicios Prácticos de Estilos y Encapsulación

Estos ejercicios te ayudarán a practicar diferentes técnicas de estilización y encapsulación en Angular, desde conceptos básicos hasta patrones avanzados.

## 🎯 Reto 1: Estilos de componentes con diferentes métodos

**Objetivo:** Implementar el mismo componente visual utilizando diferentes métodos de aplicación de estilos.

**Tareas:**
1. Crea un componente `CardComponent` con un título, contenido y botón
2. Implementa la primera versión con estilos inline usando `styles: []`
3. Crea una segunda versión con archivo externo usando `styleUrls: []` 
4. Implementa una tercera versión utilizando un preprocesador (SCSS)
5. Compara las ventajas y desventajas de cada enfoque

**Generación del proyecto de prueba:**
```bash
# Crear proyecto con SCSS como preprocesador por defecto
ng new style-challenge --style=scss

# Generar los componentes para cada enfoque
ng generate component inline-card
ng generate component external-card
ng generate component scss-card
```

**Código base para el primer componente (inline):**
```typescript
@Component({
  selector: 'app-inline-card',
  template: `
    <div class="card">
      <div class="card-header">
        <h2>{{ title }}</h2>
      </div>
      <div class="card-body">
        <p>{{ content }}</p>
      </div>
      <div class="card-footer">
        <button class="btn" (click)="handleClick()">{{ buttonText }}</button>
      </div>
    </div>
  `,
  styles: [
    `
    .card {
      border: 1px solid #ddd;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      margin-bottom: 20px;
      overflow: hidden;
    }
    
    .card-header {
      background-color: #f8f9fa;
      padding: 10px 15px;
      border-bottom: 1px solid #ddd;
    }
    
    .card-header h2 {
      margin: 0;
      font-size: 18px;
      color: #333;
    }
    
    .card-body {
      padding: 15px;
    }
    
    .card-footer {
      padding: 10px 15px;
      background-color: #f8f9fa;
      border-top: 1px solid #ddd;
      text-align: right;
    }
    
    .btn {
      background-color: #007bff;
      color: white;
      border: none;
      padding: 6px 12px;
      border-radius: 4px;
      cursor: pointer;
    }
    
    .btn:hover {
      background-color: #0069d9;
    }
    `
  ]
})
export class InlineCardComponent {
  @Input() title: string = 'Card Title';
  @Input() content: string = 'This is the card content.';
  @Input() buttonText: string = 'Click Me';
  
  @Output() buttonClick = new EventEmitter<void>();
  
  handleClick() {
    this.buttonClick.emit();
  }
}
```

**Para el segundo componente (externo),** crea un archivo HTML externo con la misma estructura y un archivo CSS externo con los mismos estilos.

**Para el tercer componente (SCSS),** refactoriza los estilos utilizando características de SCSS como variables, anidamiento y mixins.

## 🎯 Reto 2: Experimentación con modos de encapsulación

**Objetivo:** Crear tres componentes idénticos pero con diferentes estrategias de encapsulación para comparar su comportamiento.

**Tareas:**
1. Crea un componente con `ViewEncapsulation.Emulated` (predeterminado)
2. Crea un componente con `ViewEncapsulation.None`
3. Crea un componente con `ViewEncapsulation.ShadowDom`
4. Implementa un estilo global que intente afectar a todos los componentes
5. Observa y registra las diferencias en el comportamiento

**Generación de componentes:**
```bash
ng generate component encapsulation-emulated
ng generate component encapsulation-none
ng generate component encapsulation-shadow
```

**Estructura básica para cada componente:**

```typescript
// encapsulation-emulated.component.ts
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-encapsulation-emulated',
  templateUrl: './encapsulation-emulated.component.html',
  styleUrls: ['./encapsulation-emulated.component.scss'],
  // Este es el valor predeterminado, no es necesario especificarlo
  encapsulation: ViewEncapsulation.Emulated
})
export class EncapsulationEmulatedComponent { }

// encapsulation-none.component.ts
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-encapsulation-none',
  templateUrl: './encapsulation-none.component.html',
  styleUrls: ['./encapsulation-none.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EncapsulationNoneComponent { }

// encapsulation-shadow.component.ts
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-encapsulation-shadow',
  templateUrl: './encapsulation-shadow.component.html',
  styleUrls: ['./encapsulation-shadow.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class EncapsulationShadowComponent { }
```

**HTML idéntico para todos:**
```html
<div class="encapsulation-container">
  <h2 class="title">Componente con encapsulación {{type}}</h2>
  <p class="description">Este párrafo debería verse afectado por los estilos definidos para este componente.</p>
  <button class="btn">Botón de prueba</button>
</div>
```

**Estilos idénticos para todos:**
```scss
// Para cada componente
.encapsulation-container {
  border: 2px solid #333;
  padding: 20px;
  margin-bottom: 20px;
  background-color: #f9f9f9;
}

.title {
  color: #007bff;
}

.description {
  color: #666;
}

.btn {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
}
```

**Estilo global para probar la encapsulación:**
```scss
/* styles.scss (global) */
.title {
  color: red !important;
  font-style: italic;
}

.btn {
  background-color: purple !important;
}
```

**Componente contenedor para mostrarlos todos:**
```html
<div class="container">
  <h1>Experimento de Encapsulación de Vistas</h1>
  
  <app-encapsulation-emulated></app-encapsulation-emulated>
  <app-encapsulation-none></app-encapsulation-none>
  <app-encapsulation-shadow></app-encapsulation-shadow>
  
  <div class="comparison">
    <h2 class="title">Elemento Global</h2>
    <p class="description">Este elemento está fuera de cualquier componente y debería verse afectado por los estilos globales.</p>
    <button class="btn">Botón global</button>
  </div>
</div>
```

## 🎯 Reto 3: Sistema de tarjetas con temas utilizando CSS variables

**Objetivo:** Crear un sistema de tarjetas que pueda cambiar de tema utilizando CSS variables.

**Tareas:**
1. Crea un componente `ThemeCardComponent` que utilice CSS variables para colores y estilos
2. Implementa al menos tres temas diferentes (claro, oscuro, colorido)
3. Crea un selector de temas que permita cambiar el tema en tiempo real
4. Asegúrate de que los cambios se apliquen sin necesidad de recargar la página
5. Utiliza la estrategia de encapsulación apropiada

**Estructura básica:**

```typescript
// theme.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ThemeType = 'light' | 'dark' | 'colorful';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themeSource = new BehaviorSubject<ThemeType>('light');
  currentTheme$ = this.themeSource.asObservable();
  
  setTheme(theme: ThemeType) {
    this.themeSource.next(theme);
    document.body.className = `theme-${theme}`;
  }
}

// theme-card.component.ts
@Component({
  selector: 'app-theme-card',
  templateUrl: './theme-card.component.html',
  styleUrls: ['./theme-card.component.scss']
})
export class ThemeCardComponent implements OnInit, OnDestroy {
  @Input() title: string;
  @Input() content: string;
  
  private subscription: Subscription;
  
  constructor(private themeService: ThemeService) {}
  
  ngOnInit() {
    // Suscribirse al tema actual
  }
  
  ngOnDestroy() {
    // Limpiar la suscripción
  }
}
```

**Estilos globales para las variables de tema:**
```scss
// styles.scss
:root {
  // Variables para el tema claro (por defecto)
  --primary-color: #336699;
  --secondary-color: #ff6b6b;
  --background-color: #ffffff;
  --text-color: #333333;
  --border-color: #dddddd;
  --card-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

// Tema oscuro
.theme-dark {
  --primary-color: #66a3ff;
  --secondary-color: #ff9e9e;
  --background-color: #222222;
  --text-color: #f0f0f0;
  --border-color: #444444;
  --card-shadow: 0 2px 5px rgba(0,0,0,0.3);
}

// Tema colorido
.theme-colorful {
  --primary-color: #6a0dad;
  --secondary-color: #ffcc00;
  --background-color: #e8f5e9;
  --text-color: #2e7d32;
  --border-color: #81c784;
  --card-shadow: 0 2px 8px rgba(46, 125, 50, 0.2);
}
```

**Estilos del componente ThemeCard:**
```scss
// theme-card.component.scss
.theme-card {
  background-color: var(--background-color);
  color: var(--text-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: var(--card-shadow);
  transition: all 0.3s ease;
  
  &__title {
    color: var(--primary-color);
    margin-top: 0;
    margin-bottom: 15px;
    font-size: 20px;
  }
  
  &__content {
    line-height: 1.5;
  }
  
  &__footer {
    margin-top: 20px;
    padding-top: 15px;
    border-top: 1px solid var(--border-color);
    display: flex;
    justify-content: flex-end;
  }
  
  &__button {
    background-color: var(--primary-color);
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;
    
    &:hover {
      background-color: darken(color(--primary-color), 10%);
    }
  }
}
```

**Implementación del selector de temas:**
```html
<!-- theme-selector.component.html -->
<div class="theme-selector">
  <h3>Selecciona un tema:</h3>
  <div class="theme-buttons">
    <button 
      class="theme-button" 
      [class.active]="currentTheme === 'light'"
      (click)="setTheme('light')">
      Claro
    </button>
    <button 
      class="theme-button" 
      [class.active]="currentTheme === 'dark'"
      (click)="setTheme('dark')">
      Oscuro
    </button>
    <button 
      class="theme-button" 
      [class.active]="currentTheme === 'colorful'"
      (click)="setTheme('colorful')">
      Colorido
    </button>
  </div>
</div>
```

## 🎯 Reto 4: Sistema de componentes con aislamiento de estilos con BEM

**Objetivo:** Crear un sistema de componentes UI aplicando la metodología BEM para aislamiento de estilos.

**Tareas:**
1. Crea componentes básicos de UI (Button, Card, Alert, Badge)
2. Implementa la nomenclatura BEM para todos los estilos
3. Asegúrate de que los componentes se pueden personalizar a través de @Input
4. Prueba que los estilos no interfieren entre sí
5. Crea una página de demostración que use todos los componentes juntos

**Estructura básica para el componente Button:**

```typescript
// button.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() variant: 'primary' | 'secondary' | 'danger' | 'success' = 'primary';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() disabled: boolean = false;
  @Input() fullWidth: boolean = false;
  
  @Output() click = new EventEmitter<void>();
  
  handleClick() {
    if (!this.disabled) {
      this.click.emit();
    }
  }
}
```

**Template del botón con clases BEM:**
```html
<!-- button.component.html -->
<button 
  class="btn"
  [class.btn--primary]="variant === 'primary'"
  [class.btn--secondary]="variant === 'secondary'"
  [class.btn--danger]="variant === 'danger'"
  [class.btn--success]="variant === 'success'"
  [class.btn--small]="size === 'small'"
  [class.btn--medium]="size === 'medium'"
  [class.btn--large]="size === 'large'"
  [class.btn--full-width]="fullWidth"
  [disabled]="disabled"
  (click)="handleClick()"
>
  <ng-content></ng-content>
</button>
```

**Estilos del botón con BEM:**
```scss
// button.component.scss
.btn {
  // Estilos base
  display: inline-block;
  font-weight: 500;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
  border: 1px solid transparent;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: all 0.2s ease-in-out;
  
  // Modificadores de variante
  &--primary {
    background-color: #007bff;
    color: white;
    
    &:hover {
      background-color: darken(#007bff, 10%);
    }
  }
  
  &--secondary {
    background-color: #6c757d;
    color: white;
    
    &:hover {
      background-color: darken(#6c757d, 10%);
    }
  }
  
  &--danger {
    background-color: #dc3545;
    color: white;
    
    &:hover {
      background-color: darken(#dc3545, 10%);
    }
  }
  
  &--success {
    background-color: #28a745;
    color: white;
    
    &:hover {
      background-color: darken(#28a745, 10%);
    }
  }
  
  // Modificadores de tamaño
  &--small {
    padding: 0.25rem 0.5rem;
    font-size: 0.875rem;
  }
  
  &--medium {
    // Ya configurado en los estilos base
  }
  
  &--large {
    padding: 0.75rem 1.5rem;
    font-size: 1.25rem;
  }
  
  // Otros modificadores
  &--full-width {
    display: block;
    width: 100%;
  }
  
  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
    pointer-events: none;
  }
}
```

**Implementa los demás componentes (Card, Alert, Badge) siguiendo la misma metodología BEM.**

## 🎯 Reto 5: Biblioteca de componentes con diferentes modos de encapsulación

**Objetivo:** Crear una pequeña biblioteca de componentes donde cada componente use la estrategia de encapsulación más adecuada según su propósito.

**Tareas:**
1. Crea un componente `GlobalStylesComponent` con `ViewEncapsulation.None` para estilos globales
2. Crea un componente `StandardCardComponent` con la encapsulación predeterminada
3. Crea un componente `IsolatedWidgetComponent` con `ViewEncapsulation.ShadowDom`
4. Implementa un formulario con campos de entrada usando los tres tipos de componentes
5. Prueba cómo interactúan entre sí y con los estilos globales

**Estructura básica:**

```typescript
// global-styles.component.ts
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-global-styles',
  template: `<ng-content></ng-content>`,
  styles: [`
    /* Estilos de reset y tipografía */
    h1, h2, h3, h4, h5, h6 {
      margin-top: 0;
      font-weight: 500;
      line-height: 1.2;
    }
    
    h1 { font-size: 2.5rem; }
    h2 { font-size: 2rem; }
    h3 { font-size: 1.75rem; }
    
    .text-primary { color: #007bff; }
    .text-success { color: #28a745; }
    .text-danger { color: #dc3545; }
    
    /* Utilidades de espaciado */
    .mt-3 { margin-top: 1rem; }
    .mb-3 { margin-bottom: 1rem; }
    .p-3 { padding: 1rem; }
  `],
  encapsulation: ViewEncapsulation.None
})
export class GlobalStylesComponent { }

// standard-card.component.ts
@Component({
  selector: 'app-standard-card',
  templateUrl: './standard-card.component.html',
  styleUrls: ['./standard-card.component.scss']
  // Encapsulación predeterminada (Emulated)
})
export class StandardCardComponent {
  @Input() title: string;
  // ...
}

// isolated-widget.component.ts
@Component({
  selector: 'app-isolated-widget',
  templateUrl: './isolated-widget.component.html',
  styleUrls: ['./isolated-widget.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class IsolatedWidgetComponent {
  @Input() data: any;
  // ...
}
```

**Estructura de la aplicación:**
```html
<app-global-styles>
  <div class="container">
    <h1 class="text-primary mb-3">Biblioteca de Componentes</h1>
    
    <app-standard-card title="Formulario Estándar">
      <form>
        <div class="form-group">
          <label>Nombre</label>
          <input type="text" class="form-control">
        </div>
        <div class="form-group">
          <label>Email</label>
          <input type="email" class="form-control">
        </div>
        <button type="submit" class="btn btn-primary">Enviar</button>
      </form>
    </app-standard-card>
    
    <app-isolated-widget [data]="widgetData">
      <!-- Este contenido estará completamente aislado del resto de estilos -->
    </app-isolated-widget>
  </div>
</app-global-styles>
```

## 🔍 Verificación y aprendizaje

Para cada ejercicio, analiza:

1. **Inspección del DOM:** Usa las herramientas de desarrollo del navegador para inspeccionar cómo Angular ha aplicado la encapsulación
2. **Especificidad:** Observa cómo los selectores CSS se han transformado
3. **Comportamiento:** Verifica si los estilos se aplican como esperabas
4. **Interacción:** Prueba cómo interactúan los componentes con diferentes estrategias de encapsulación
5. **Rendimiento:** Observa si hay diferencias de rendimiento entre las diferentes estrategias

Estas observaciones te ayudarán a entender mejor cómo funciona la encapsulación de estilos en Angular y cuándo usar cada estrategia.
