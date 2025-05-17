# Sintaxis de Templates en Angular

Los templates en Angular son fragmentos de HTML que le indican a Angular cómo renderizar un componente en la interfaz de usuario. Angular extiende el HTML con funcionalidades adicionales que permiten crear vistas dinámicas.

## 🧩 Elementos básicos de un template

Un template puede definirse de dos formas:

**Inline template (dentro del decorador):**
```typescript
@Component({
  selector: 'app-hello',
  template: `
    <h1>Hello, {{name}}!</h1>
    <p>Welcome to our app.</p>
  `
})
```

**External template (archivo separado):**
```typescript
@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html'
})
```

## 📝 Enlace de datos (Data Binding)

Angular ofrece cuatro formas de enlace de datos:

### 1. Interpolación: `{{expresión}}`

Muestra el valor de una expresión en el HTML.

```html
<h1>¡Hola, {{username}}!</h1>
<p>Tienes {{unreadMessages}} mensaje(s) sin leer.</p>
<div>La suma es: {{2 + 2}}</div>
```

### 2. Property Binding: `[propiedad]="expresión"`

Enlaza una propiedad de un elemento HTML o directiva con una expresión.

```html
<img [src]="userProfileImage">
<button [disabled]="isSubmitting">Enviar</button>
<div [class.active]="isActive">Contenido</div>
```

### 3. Event Binding: `(evento)="método()"`

Responde a eventos del DOM o eventos personalizados.

```html
<button (click)="saveData()">Guardar</button>
<input (keyup)="onKeyUp($event)">
<div (mouseover)="showTooltip()" (mouseout)="hideTooltip()">Información</div>
```

### 4. Two-way Binding: `[(ngModel)]="propiedad"`

Combina property binding y event binding, manteniendo sincronizados el modelo y la vista (requiere FormsModule).

```html
<input [(ngModel)]="username">
<p>Hola, {{username}}!</p>
```

## 🔄 Directivas estructurales

Modifican la estructura del DOM.

### `*ngIf`: Renderizado condicional

```html
<div *ngIf="user">
  Bienvenido, {{user.name}}
</div>

<div *ngIf="isLoggedIn; else loginTemplate">
  Contenido para usuarios autenticados
</div>
<ng-template #loginTemplate>
  Por favor, inicia sesión
</ng-template>
```

### `*ngFor`: Renderizado de listas

```html
<ul>
  <li *ngFor="let item of items; let i = index; let isFirst = first">
    {{i}}: {{item.name}} 
    <span *ngIf="isFirst">(Primero)</span>
  </li>
</ul>
```

### `*ngSwitch`: Múltiples condiciones

```html
<div [ngSwitch]="userRole">
  <div *ngSwitchCase="'admin'">Panel de administrador</div>
  <div *ngSwitchCase="'editor'">Herramientas de edición</div>
  <div *ngSwitchDefault>Contenido de usuario</div>
</div>
```

## 🎨 Directivas de atributo

Modifican la apariencia o el comportamiento de un elemento.

### `ngClass`: Clases condicionales

```html
<div [ngClass]="{'active': isActive, 'disabled': isDisabled, 'highlight': isHighlighted}">
  Contenido con clases dinámicas
</div>
```

### `ngStyle`: Estilos condicionales

```html
<div [ngStyle]="{'color': textColor, 'font-size.px': fontSize, 'background-color': isActive ? 'yellow' : 'transparent'}">
  Texto con estilos dinámicos
</div>
```

## 📋 Referencias a elementos del template

Permite acceder a elementos del DOM o directivas.

```html
<input #nameInput type="text">
<button (click)="greet(nameInput.value)">Saludar</button>
```

## 🧩 Templates y variables locales

### Template reference variables

```html
<form #userForm="ngForm" (ngSubmit)="onSubmit(userForm)">
  <input name="username" ngModel required #username="ngModel">
  <div *ngIf="username.invalid && username.touched">
    El nombre de usuario es obligatorio
  </div>
  <button type="submit" [disabled]="userForm.invalid">Enviar</button>
</form>
```

### ng-template y ng-container

```html
<!-- ng-template no renderiza nada por sí mismo -->
<ng-template #loading>
  <div class="spinner">Cargando...</div>
</ng-template>

<!-- ng-container es un contenedor invisible -->
<ng-container *ngIf="dataLoaded; else loading">
  <app-data-display [data]="data"></app-data-display>
</ng-container>
```

## 🔄 Pipes para transformación de datos

Los pipes transforman valores para su visualización.

```html
<p>Fecha: {{today | date:'dd/MM/yyyy'}}</p>
<p>Precio: {{product.price | currency:'EUR'}}</p>
<p>Mensaje: {{message | uppercase}}</p>
<p>Datos JSON: {{data | json}}</p>
<p>Porcentaje: {{ratio | percent:'1.1-2'}}</p>
```

### Encadenamiento de pipes

```html
<p>{{today | date:'fullDate' | uppercase}}</p>
```

### Pipes con parámetros

```html
<p>{{message | slice:0:50}}</p>
```

## 🔍 Eventos del DOM y $event

```html
<input (keyup)="onKeyUp($event)">
<div (click)="onClick($event)">Haz click</div>
```

## 💡 Consejos para templates eficientes

1. **Mantén la lógica al mínimo**: Mueve la lógica compleja al componente
2. **Optimiza ngFor**: Usa trackBy para mejor rendimiento
   ```html
   <li *ngFor="let item of items; trackBy: trackByFn">{{item.name}}</li>
   ```
3. **Usa ng-container**: Para directivas estructurales múltiples sin añadir elementos extra al DOM
   ```html
   <ng-container *ngIf="user" *ngFor="let permission of user.permissions">
     {{permission}}
   </ng-container>
   ```
4. **Considera expresiones puras**: Evita cambios de estado en expresiones de template
5. **Usa async pipe**: Simplifica la gestión de Observables y Promises
   ```html
   <div *ngIf="user$ | async as user">
     {{user.name}}
   </div>
   ```

## 🔄 Binding a propiedades personalizadas

Cuando desarrollas componentes personalizados, puedes enlazar a sus @Input():

```html
<app-user-card 
  [user]="currentUser" 
  [showDetails]="true"
  (userSelected)="onUserSelected($event)">
</app-user-card>
```

