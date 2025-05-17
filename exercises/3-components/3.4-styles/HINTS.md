# Técnicas Avanzadas para Estilos y Encapsulación

Este documento proporciona soluciones avanzadas y mejores prácticas para el manejo de estilos en componentes Angular, enfocándose en cómo superar desafíos comunes relacionados con la encapsulación y el aislamiento de estilos.

## 🎨 Técnicas para compartir estilos entre componentes

### 1. Variables CSS personalizadas (Custom Properties)

Las variables CSS son una excelente manera de compartir valores estilísticos sin romper la encapsulación:

```css
/* En styles.css (global) */
:root {
  --primary-color: #3f51b5;
  --secondary-color: #ff4081;
  --text-color: #333333;
  --spacing-unit: 8px;
  --border-radius: 4px;
  --font-family: 'Roboto', sans-serif;
}

/* En cualquier componente */
.component-specific-element {
  color: var(--primary-color);
  padding: calc(var(--spacing-unit) * 2);
  border-radius: var(--border-radius);
  font-family: var(--font-family);
}
```

Ventajas:
- Mantiene la encapsulación
- Permite cambios centralizados (incluso en tiempo de ejecución)
- Compatible con temas

### 2. SCSS/SASS con archivos parciales

Configura tu proyecto para usar SCSS y aprovecha los parciales para compartir definiciones:

```scss
// _variables.scss
$primary-color: #3f51b5;
$secondary-color: #ff4081;
$text-color: #333333;
$spacing-unit: 8px;

// _mixins.scss
@mixin elevation($level) {
  @if $level == 1 {
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  } @else if $level == 2 {
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  } @else if $level == 3 {
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
  }
}

// En component.scss
@import 'src/styles/variables';
@import 'src/styles/mixins';

.my-component {
  background-color: $primary-color;
  color: white;
  padding: $spacing-unit * 2;
  @include elevation(2);
}
```

Para configurar Angular con SCSS:

```bash
# Al crear nuevo proyecto
ng new my-app --style=scss

# Para un proyecto existente
ng config schematics.@schematics/angular:component.style scss
```

### 3. Biblioteca de estilos con Angular Material

Implementa una biblioteca de componentes estilizados:

```typescript
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  exports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ]
})
export class MaterialModule { }
```

```html
<button mat-raised-button color="primary">Botón Principal</button>
<mat-card>
  <mat-card-title>Título de la tarjeta</mat-card-title>
  <mat-card-content>
    Contenido de la tarjeta
  </mat-card-content>
</mat-card>
```

## 🧩 Soluciones a problemas comunes con la encapsulación de estilos

### 1. Estilar componentes de terceros (con ViewEncapsulation.None)

```typescript
@Component({
  selector: 'app-third-party-wrapper',
  template: `
    <h2>Componente de Terceros Personalizado</h2>
    <third-party-component></third-party-component>
  `,
  styles: [`
    /* Estos estilos afectarán al componente de terceros */
    third-party-component .some-class {
      color: red;
    }
    
    /* Afecta a elementos internos específicos */
    third-party-component .header {
      font-size: 18px;
      font-weight: bold;
    }
  `],
  encapsulation: ViewEncapsulation.None
})
export class ThirdPartyWrapperComponent { }
```

⚠️ **Advertencia**: Usar `ViewEncapsulation.None` debe ser una excepción, no una regla. Solo úsalo cuando sea absolutamente necesario, ya que puede crear efectos secundarios inesperados.

### 2. Técnica de estilización con ::ng-deep (para casos específicos)

```typescript
@Component({
  selector: 'app-styled-tabs',
  template: `<ngb-tabset></ngb-tabset>`,
  styles: [`
    :host ::ng-deep {
      .nav-tabs {
        border-bottom: 2px solid #3f51b5;
      }
      
      .nav-link.active {
        font-weight: bold;
        color: #3f51b5;
      }
    }
  `]
})
export class StyledTabsComponent { }
```

**Importante**: `::ng-deep` está obsoleto pero todavía funciona. Siempre úsalo junto con `:host` para limitar el alcance de los estilos.

### 3. Solución con clases de host personalizadas

Usa `@HostBinding` para añadir clases dinámicamente:

```typescript
@Component({
  selector: 'app-theme-aware',
  template: `<div>Contenido con tema dinámico</div>`,
  styles: [`
    :host.theme-dark {
      background-color: #333;
      color: white;
    }
    
    :host.theme-light {
      background-color: #fff;
      color: #333;
    }
  `]
})
export class ThemeAwareComponent {
  @HostBinding('class.theme-dark') isDarkTheme: boolean;
  @HostBinding('class.theme-light') 
  get isLightTheme(): boolean {
    return !this.isDarkTheme;
  }
  
  constructor(private themeService: ThemeService) {
    this.themeService.isDarkTheme$.subscribe(isDark => {
      this.isDarkTheme = isDark;
    });
  }
}
```

## 🎯 Estrategias para estilos responsivos en componentes

### 1. Media Queries dentro de componentes

Los media queries funcionan perfectamente dentro de los estilos encapsulados:

```typescript
@Component({
  selector: 'app-responsive-card',
  template: `
    <div class="card">
      <div class="card-media"></div>
      <div class="card-content">
        <h2>{{ title }}</h2>
        <p>{{ description }}</p>
      </div>
    </div>
  `,
  styles: [`
    .card {
      display: flex;
      flex-direction: column;
      border-radius: 4px;
      overflow: hidden;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    }
    
    .card-media {
      height: 200px;
      background-color: #f5f5f5;
    }
    
    .card-content {
      padding: 16px;
    }
    
    @media (min-width: 768px) {
      .card {
        flex-direction: row;
      }
      
      .card-media {
        width: 30%;
        height: auto;
      }
      
      .card-content {
        width: 70%;
      }
    }
  `]
})
export class ResponsiveCardComponent {
  @Input() title: string;
  @Input() description: string;
}
```

### 2. Clases utilitarias responsive con HostBinding

```typescript
@Component({
  selector: 'app-adaptive-layout',
  template: `
    <div class="content">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    :host.compact .content {
      padding: 8px;
      font-size: 14px;
    }
    
    :host.regular .content {
      padding: 16px;
      font-size: 16px;
    }
    
    :host.expanded .content {
      padding: 24px;
      font-size: 18px;
    }
  `]
})
export class AdaptiveLayoutComponent implements OnInit {
  @HostBinding('class.compact') isCompact = false;
  @HostBinding('class.regular') isRegular = false;
  @HostBinding('class.expanded') isExpanded = false;
  
  constructor(private breakpointObserver: BreakpointObserver) {}
  
  ngOnInit() {
    this.breakpointObserver.observe([
      '(max-width: 576px)',
      '(min-width: 577px) and (max-width: 992px)',
      '(min-width: 993px)'
    ]).subscribe(result => {
      this.isCompact = result.breakpoints['(max-width: 576px)'];
      this.isRegular = result.breakpoints['(min-width: 577px) and (max-width: 992px)'];
      this.isExpanded = result.breakpoints['(min-width: 993px)'];
    });
  }
}
```

## 📦 Organización de estilos para proyectos escalables

### 1. Estructura de carpetas recomendada

```
src/
├── styles/
│   ├── _variables.scss    # Variables globales
│   ├── _typography.scss   # Configuración de tipografía
│   ├── _mixins.scss       # Mixins reutilizables
│   ├── _animations.scss   # Animaciones compartidas
│   ├── _utilities.scss    # Clases utilitarias
│   ├── themes/            # Archivos de temas
│   │   ├── _light.scss
│   │   └── _dark.scss
│   └── vendors/           # Estilos de terceros
│       ├── _normalize.scss
│       └── _bootstrap.scss
├── app/
│   ├── components/        # Componentes ordenados por módulo
│   │   ├── shared/        # Componentes compartidos
│   │   ├── dashboard/     # Componentes específicos del módulo
│   │   └── ...
│   └── ...
└── styles.scss            # Importa los estilos globales
```

### 2. Implementación de sistema de diseño con SCSS

```scss
// styles/_variables.scss
// Sistema de espaciado con escala
$spacer: 8px;
$spacers: (
  0: 0,
  1: $spacer,    // 8px
  2: $spacer * 2, // 16px
  3: $spacer * 3, // 24px
  4: $spacer * 5, // 40px
  5: $spacer * 8  // 64px
);

// Sistema de colores
$colors: (
  'primary': (
    'base': #3f51b5,
    'light': #757de8,
    'dark': #002984
  ),
  'secondary': (
    'base': #ff4081,
    'light': #ff79b0,
    'dark': #c60055
  ),
  'neutral': (
    'white': #ffffff,
    'gray-100': #f5f5f5,
    'gray-200': #eeeeee,
    'gray-300': #e0e0e0,
    'gray-400': #bdbdbd,
    'gray-500': #9e9e9e,
    'gray-600': #757575,
    'gray-700': #616161,
    'gray-800': #424242,
    'gray-900': #212121,
    'black': #000000
  )
);

// Radios de borde
$border-radius-sm: 2px;
$border-radius: 4px;
$border-radius-lg: 8px;

// styles/_mixins.scss
@mixin generate-spacing-utilities {
  @each $prop, $abbrev in (margin: m, padding: p) {
    @each $size, $value in $spacers {
      .#{$abbrev}-#{$size} { #{$prop}: $value !important; }
      .#{$abbrev}t-#{$size} { #{$prop}-top: $value !important; }
      .#{$abbrev}r-#{$size} { #{$prop}-right: $value !important; }
      .#{$abbrev}b-#{$size} { #{$prop}-bottom: $value !important; }
      .#{$abbrev}l-#{$size} { #{$prop}-left: $value !important; }
    }
  }
}

@mixin theme-color($color-name, $color-variant: 'base') {
  $color-map: map-get($colors, $color-name);
  @if $color-map {
    $color-value: map-get($color-map, $color-variant);
    @if $color-value {
      @return $color-value;
    }
  }
  @error "Color `#{$color-name}` with variant `#{$color-variant}` not found in $colors map.";
}

// styles.scss
@import 'styles/variables';
@import 'styles/mixins';

// Generar clases utilitarias
@include generate-spacing-utilities;

// Uso en un componente
.my-component {
  background-color: theme-color('primary');
  color: theme-color('neutral', 'white');
  border-radius: $border-radius;
  padding: map-get($spacers, 3);
  margin-bottom: map-get($spacers, 4);
}
```

### 3. Implementación de temas con CSS Custom Properties

```scss
// _theme-generator.scss
@mixin generate-theme-properties($theme-name, $theme-map) {
  .theme-#{$theme-name} {
    @each $property, $value in $theme-map {
      --#{$property}: #{$value};
    }
  }
}

// themes/_light.scss
$light-theme: (
  'bg-primary': #ffffff,
  'bg-secondary': #f5f5f5,
  'text-primary': #212121,
  'text-secondary': #757575,
  'accent': #ff4081,
  'border': #e0e0e0
);

@include generate-theme-properties('light', $light-theme);

// themes/_dark.scss
$dark-theme: (
  'bg-primary': #121212,
  'bg-secondary': #292929,
  'text-primary': #ffffff,
  'text-secondary': #b0b0b0,
  'accent': #ff79b0,
  'border': #424242
);

@include generate-theme-properties('dark', $dark-theme);

// Uso en componente
.themed-component {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  border: 1px solid var(--border);
}
```

## 🔧 Herramientas y extensiones recomendadas

### 1. Extensiones de VS Code para estilos

- **CSS Peek**: Permite navegar a definiciones CSS desde HTML
- **SCSS IntelliSense**: Autocompletado para SCSS
- **Angular Language Service**: Mejora el autocompletado para templates y estilos
- **stylelint**: Linter para identificar problemas en tus estilos

### 2. Herramientas de preprocesado

```json
// angular.json
{
  "projects": {
    "my-app": {
      "architect": {
        "build": {
          "options": {
            "styles": [
              "src/styles.scss"
            ],
            "stylePreprocessorOptions": {
              "includePaths": [
                "src/styles"
              ]
            }
          }
        }
      }
    }
  }
}
```

Con esta configuración, puedes importar archivos SCSS sin rutas relativas complejas:

```scss
// Antes
@import '../../../styles/variables';

// Después
@import 'variables';
```

### 3. Uso de autoprefixer

Angular CLI incluye autoprefixer por defecto, pero puedes configurarlo para soportar navegadores específicos en `browserslist` en package.json:

```json
"browserslist": [
  "> 1%",
  "last 2 versions",
  "Firefox ESR",
  "not dead",
  "not IE 9-11"
]
```

## 📚 Recursos adicionales

1. [Guía oficial de Angular sobre estilos de componentes](https://angular.io/guide/component-styles)
2. [Angular Material Design Guidelines](https://material.angular.io/guide/theming)
3. [CSS Architecture for Angular Applications](https://blog.angular-university.io/angular-material-data-table/)
4. [CSS Custom Properties - MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
5. [Sass Guidelines para proyectos grandes](https://sass-guidelin.es/)

## 📌 Checklist para revisión de estilos

- [ ] Los estilos están correctamente encapsulados según las necesidades del componente
- [ ] Se utilizan variables o constantes para valores reutilizables (colores, espaciado, etc.)
- [ ] Los estilos son responsivos y se adaptan a diferentes tamaños de pantalla
- [ ] Se evita la redundancia mediante el uso de mixins o funciones
- [ ] La especificidad de los selectores está optimizada para evitar anulaciones no deseadas
- [ ] Se mantiene una nomenclatura consistente para clases y variables
- [ ] Los estilos críticos están incrustados cuando se necesita rendimiento
- [ ] Se utiliza lazy loading para estilos de rutas específicas cuando es posible
- [ ] Los medios de comunicación están optimizados y configurados correctamente
- [ ] Se implementan temas o variaciones de color de manera centralizada
