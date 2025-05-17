# Opciones de Configuración (Metadatos) para Componentes

Los metadatos de un componente determinan cómo debe funcionar el componente dentro de una aplicación Angular. Estas opciones de configuración se definen en el decorador `@Component` y controlan aspectos como el renderizado, estilos, detección de cambios y más.

## 🧩 Opciones básicas de metadatos

```typescript
@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css']
})
```

## 📋 Referencia completa de metadatos

### 1. Configuración de selector

El selector define cómo se puede utilizar el componente en una plantilla HTML.

```typescript
@Component({
  // Como elemento (más común)
  selector: 'app-user-profile'
  
  // O como atributo
  // selector: '[app-user-profile]'
  
  // O como clase CSS
  // selector: '.app-user-profile'
})
```

### 2. Configuración de templates

Define el HTML que renderizará el componente.

```typescript
@Component({
  // Template en línea (para plantillas pequeñas)
  template: `
    <h1>{{title}}</h1>
    <p>{{description}}</p>
  `
  
  // O referencia a un archivo externo (recomendado para plantillas más grandes)
  // templateUrl: './example.component.html'
})
```

### 3. Configuración de estilos

Define los estilos CSS que se aplicarán al componente.

```typescript
@Component({
  // Estilos en línea
  styles: [`
    h1 { color: blue; }
    p { font-size: 14px; }
  `]
  
  // O referencia a uno o más archivos externos
  // styleUrls: ['./example.component.css', './example.theme.css']
})
```

### 4. Encapsulación de vista

Controla cómo se encapsulan y aplican los estilos al componente.

```typescript
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  // ...
  encapsulation: ViewEncapsulation.Emulated // Valor por defecto
  
  // Otras opciones:
  // encapsulation: ViewEncapsulation.None // Sin encapsulación, estilos globales
  // encapsulation: ViewEncapsulation.ShadowDom // Usa Shadow DOM nativo si está disponible
})
```

### 5. Estrategia de detección de cambios

Define cuándo Angular debe verificar cambios en el componente.

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  // ...
  changeDetection: ChangeDetectionStrategy.Default // Valor por defecto, verifica siempre
  
  // Para optimizar rendimiento:
  // changeDetection: ChangeDetectionStrategy.OnPush // Solo verifica cuando cambian las entradas inmutables
})
```

### 6. Inyección de dependencias a nivel de componente

Define servicios disponibles solo para este componente y sus hijos.

```typescript
@Component({
  // ...
  providers: [
    UserService,
    { provide: LoggerService, useClass: AdvancedLoggerService },
    { provide: CONFIG, useValue: { apiUrl: 'https://api.example.com' } }
  ]
})
```

### 7. Consultas de vista

Configuración avanzada para ViewChild/ViewChildren.

```typescript
@Component({
  // ...
  queries: {
    contentChildren: new ContentChildren(ChildDirective),
    viewChildren: new ViewChildren(ChildDirective)
  }
})
```

### 8. Preservación de espacios en blanco

Controla cómo se manejan los espacios en blanco en las plantillas.

```typescript
@Component({
  // ...
  preserveWhitespaces: false // Valor por defecto
  
  // Para preservar espacios:
  // preserveWhitespaces: true
})
```

### 9. Componentes host

Define propiedades, atributos, clases y eventos para el elemento host del componente.

```typescript
@Component({
  // ...
  host: {
    'class': 'card-component',
    '[class.active]': 'isActive',
    '(click)': 'onClick()',
    '[attr.role]': 'role',
    '[style.width.px]': 'width'
  }
})
```

### 10. Interpolación personalizada

Cambia los delimitadores de interpolación (raro pero posible).

```typescript
@Component({
  // ...
  interpolation: ['[[', ']]'] // Reemplaza {{ y }} con [[ y ]]
})
```

### 11. Exportación como

Nombre para exportar este componente cuando se usa en un módulo.

```typescript
@Component({
  // ...
  exportAs: 'appExample'
})

// Se puede usar en templates así:
// <app-example #ex="appExample"></app-example>
```

### 12. Animaciones

Define las animaciones del componente.

```typescript
import { Component, trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  // ...
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [animate('300ms ease-in')]),
      transition(':leave', [animate('300ms ease-out')])
    ])
  ]
})
```

## 🔍 Ejemplos de configuraciones comunes

### Componente básico

```typescript
@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent { }
```

### Componente con detección de cambios optimizada

```typescript
@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataListComponent { }
```

### Componente con estilos sin encapsulación

```typescript
@Component({
  selector: 'app-theme-provider',
  templateUrl: './theme-provider.component.html',
  styleUrls: ['./theme-provider.component.css', './themes/dark.css', './themes/light.css'],
  encapsulation: ViewEncapsulation.None
})
export class ThemeProviderComponent { }
```

### Componente con servicios específicos

```typescript
@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css'],
  providers: [
    ChatService,
    { provide: SOCKET_CONFIG, useValue: { reconnect: true, timeout: 5000 } }
  ]
})
export class ChatWindowComponent { }
```

### Componente con definición host

```typescript
@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
  host: {
    'class': 'btn',
    '[class.btn-primary]': 'primary',
    '[class.btn-secondary]': '!primary',
    '[attr.disabled]': 'disabled ? "disabled" : null',
    '(click)': 'handleClick($event)',
    '[attr.aria-label]': 'ariaLabel'
  }
})
export class ButtonComponent { }
```

## 💡 Consideraciones para la configuración de metadatos

1. **Piensa en la reutilización**: Usa selectores claros y específicos
2. **Rendimiento**: Usa OnPush para componentes con entradas inmutables
3. **Mantenibilidad**: Separa plantillas y estilos grandes en archivos dedicados
4. **Encapsulación**: Considera las implicaciones de diferentes estrategias de encapsulación
5. **Interoperabilidad**: Usa exportAs si el componente necesita ser accedido como referencia

## 📈 Guía de optimización con metadatos

| Escenario | Configuración recomendada |
|-----------|--------------------------|
| Componentes con muchos datos | `changeDetection: ChangeDetectionStrategy.OnPush` |
| Componentes que actúan como temas | `encapsulation: ViewEncapsulation.None` |
| Componentes de librería | `exportAs: 'libComponent'` |
| Componentes con muchos hijos | Considera `preserveWhitespaces: false` |
| Componentes con animaciones | Usa `animations: [...]` |

