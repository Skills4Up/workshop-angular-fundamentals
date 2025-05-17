# El Decorador @Component

El decorador `@Component` es la característica principal que define un componente en Angular. Este decorador convierte una clase TypeScript común en un componente Angular, proporcionando metadatos sobre cómo debe funcionar el componente y cómo debe renderizarse en la aplicación.

## 🧩 Estructura básica del decorador

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  // Clase del componente
}
```

## 📋 Propiedades principales del decorador

### `selector`

Define el nombre del elemento HTML personalizado que representará este componente en una plantilla.

```typescript
@Component({
  selector: 'app-user-profile'
})
```

**Usos en plantillas HTML:**
```html
<app-user-profile></app-user-profile>
```

**Variantes del selector:**
- **Elemento:** `selector: 'app-user-profile'` ← Más común
- **Atributo:** `selector: '[app-user-profile]'` → `<div app-user-profile></div>`
- **Clase:** `selector: '.app-user-profile'` → `<div class="app-user-profile"></div>`

### `template` / `templateUrl`

Define el HTML que este componente renderizará.

**Template en línea:**
```typescript
@Component({
  selector: 'app-greeting',
  template: '<h1>Hello, {{name}}!</h1>'
})
```

**Template en archivo separado:**
```typescript
@Component({
  selector: 'app-greeting',
  templateUrl: './greeting.component.html'
})
```

### `styles` / `styleUrls`

Define los estilos CSS que se aplicarán al componente.

**Estilos en línea:**
```typescript
@Component({
  selector: 'app-greeting',
  template: '<h1>Hello, {{name}}!</h1>',
  styles: [`
    h1 { 
      color: blue; 
      font-size: 24px; 
    }
  `]
})
```

**Estilos en archivos separados:**
```typescript
@Component({
  selector: 'app-greeting',
  templateUrl: './greeting.component.html',
  styleUrls: ['./greeting.component.css']
})
```

## 🔍 Otras propiedades importantes

### `providers`

Configura el sistema de inyección de dependencias para el componente.

```typescript
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  providers: [UserService]  // Servicios disponibles solo en este componente y sus hijos
})
```

### `viewProviders`

Similar a `providers`, pero los servicios solo están disponibles para el componente, no para los elementos proyectados.

```typescript
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  viewProviders: [CardService]  // Servicio solo disponible en la vista del componente
})
```

### `encapsulation`

Controla cómo se encapsulan los estilos CSS del componente.

```typescript
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  encapsulation: ViewEncapsulation.Emulated  // Valor por defecto
})
```

**Opciones disponibles:**
- `ViewEncapsulation.Emulated`: Encapsulación emulada (predeterminado)
- `ViewEncapsulation.None`: Sin encapsulación (estilos globales)
- `ViewEncapsulation.ShadowDom`: Encapsulación nativa usando Shadow DOM

### `changeDetection`

Define la estrategia de detección de cambios para el componente.

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-data-display',
  templateUrl: './data-display.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush  // Solo verifica cambios cuando cambian las @Input()
})
```

**Opciones disponibles:**
- `ChangeDetectionStrategy.Default`: Verifica todos los componentes en cada ciclo
- `ChangeDetectionStrategy.OnPush`: Solo verifica cuando cambian las entradas inmutables

### `animations`

Define animaciones para el componente.

```typescript
import { Component, trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-animated-box',
  templateUrl: './animated-box.component.html',
  animations: [
    trigger('openClose', [
      state('open', style({ height: '200px', opacity: 1 })),
      state('closed', style({ height: '100px', opacity: 0.5 })),
      transition('open => closed', [animate('0.5s')]),
      transition('closed => open', [animate('0.3s')])
    ])
  ]
})
```

## 💡 Ejemplos prácticos del decorador @Component

### Componente básico

```typescript
@Component({
  selector: 'app-welcome',
  template: '<h1>Bienvenido a nuestra aplicación!</h1>',
  styles: ['h1 { color: #336699; }']
})
export class WelcomeComponent { }
```

### Componente con archivo externo y selector de atributo

```typescript
@Component({
  selector: '[app-highlight]',
  templateUrl: './highlight.component.html',
  styleUrls: ['./highlight.component.css']
})
export class HighlightComponent { }
```

### Componente con estilos encapsulados

```typescript
@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class UserCardComponent { }
```

### Componente optimizado para rendimiento

```typescript
@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableComponent { }
```

