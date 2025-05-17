# Encapsulación de Vistas en Angular

La encapsulación de vistas es un mecanismo que Angular utiliza para aislar los estilos CSS de un componente, evitando que afecten o sean afectados por otros elementos de la aplicación. Este es un concepto fundamental para mantener los componentes modulares y evitar conflictos de estilo.

## 🛡️ ¿Qué es la encapsulación de vistas?

La encapsulación de vistas en Angular es una implementación del concepto de "Shadow DOM" del estándar de Componentes Web. Permite que los estilos definidos en un componente se apliquen solo a ese componente, sin "filtrarse" al resto de la aplicación.

Angular proporciona tres estrategias de encapsulación, cada una con diferentes características y casos de uso.

## 🔄 Estrategias de encapsulación

### 1. Emulated (por defecto)

Esta es la estrategia predeterminada en Angular. Simula el encapsulamiento mediante la adición de atributos únicos a los elementos HTML y modificando las reglas CSS para incluir estos atributos.

```typescript
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  encapsulation: ViewEncapsulation.Emulated // Este es el valor por defecto
})
export class CardComponent { }
```

**¿Cómo funciona?**
1. Angular asigna un atributo único al elemento host del componente (por ejemplo, `_nghost-xmy-c0`)
2. Agrega este mismo atributo como un atributo de clase a todos los elementos en el template (`_ngcontent-xmy-c0`)
3. Reescribe las reglas CSS del componente para incluir estos atributos, haciendo que sean específicas a este componente

**HTML generado:**
```html
<app-card _nghost-xmy-c0>
  <div _ngcontent-xmy-c0 class="card">
    <h2 _ngcontent-xmy-c0 class="card-title">Title</h2>
    <p _ngcontent-xmy-c0 class="card-content">Content</p>
  </div>
</app-card>
```

**CSS procesado:**
```css
.card[_ngcontent-xmy-c0] {
  border: 1px solid #ddd;
  border-radius: 4px;
}
.card-title[_ngcontent-xmy-c0] {
  color: #336699;
}
.card-content[_ngcontent-xmy-c0] {
  color: #666;
}
```

**Ventajas:**
- Compatible con todos los navegadores
- No requiere soporte nativo de Shadow DOM
- Buen equilibrio entre aislamiento y rendimiento

**Desventajas:**
- No es un verdadero Shadow DOM
- Genera atributos adicionales que aumentan el tamaño del HTML

### 2. ShadowDom

Utiliza la API nativa de Shadow DOM del navegador para encapsular los estilos del componente.

```typescript
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class ProfileComponent { }
```

**¿Cómo funciona?**
1. Angular crea un verdadero Shadow DOM para el componente
2. Los estilos definidos dentro del componente solo se aplican dentro de este Shadow DOM
3. Los estilos externos no pueden afectar al contenido del componente (a menos que se usen CSS custom properties)

**Ventajas:**
- Encapsulación real de DOM y CSS
- Mejor rendimiento en navegadores con soporte nativo
- Aislamiento completo de estilos

**Desventajas:**
- No funciona en navegadores antiguos que no soportan Shadow DOM
- Dificulta la estilización global o desde componentes padres
- Limitaciones al usar algunas bibliotecas de terceros

### 3. None

No aplica ninguna encapsulación. Los estilos se agregan al `<head>` del documento y afectan a toda la aplicación.

```typescript
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-global-styles',
  templateUrl: './global-styles.component.html',
  styleUrls: ['./global-styles.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GlobalStylesComponent { }
```

**¿Cómo funciona?**
1. Los estilos se añaden directamente al `<head>` del documento sin modificación
2. Las reglas CSS afectan a toda la aplicación, no solo al componente
3. No hay aislamiento de estilos

**Ventajas:**
- Útil para componentes que necesitan aplicar estilos globales
- No añade atributos adicionales al HTML
- Los estilos pueden afectar a componentes hijos sin necesidad de `::ng-deep`

**Desventajas:**
- Riesgo de colisiones de estilos
- Rompe el principio de encapsulación
- Puede causar efectos secundarios difíciles de rastrear

## 🔍 Comparación visual de las estrategias

### Emulated (por defecto)

```html
<!-- HTML en el DOM -->
<app-card _nghost-xmy-c0>
  <div _ngcontent-xmy-c0 class="card">
    <h2 _ngcontent-xmy-c0>Card Title</h2>
  </div>
</app-card>

<!-- Estilos en <head> -->
<style>
  .card[_ngcontent-xmy-c0] {
    border: 1px solid #ddd;
  }
  h2[_ngcontent-xmy-c0] {
    color: blue;
  }
</style>
```

### ShadowDom

```html
<!-- HTML en el DOM -->
<app-card>
  #shadow-root (open)
    <div class="card">
      <h2>Card Title</h2>
    </div>
    <style>
      .card {
        border: 1px solid #ddd;
      }
      h2 {
        color: blue;
      }
    </style>
</app-card>
```

### None

```html
<!-- HTML en el DOM -->
<app-card>
  <div class="card">
    <h2>Card Title</h2>
  </div>
</app-card>

<!-- Estilos en <head> -->
<style>
  .card {
    border: 1px solid #ddd;
  }
  h2 {
    color: blue;
  }
</style>
```

## 🔧 Casos de uso para cada estrategia

### ViewEncapsulation.Emulated (predeterminado)
- **Casos de uso:** La mayoría de los componentes de la aplicación
- **Ideal para:** Balance entre aislamiento y compatibilidad
- **Ejemplo:** Componentes de UI como formularios, tarjetas, listas...

```typescript
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
  // encapsulation: ViewEncapsulation.Emulated es el valor por defecto
})
export class LoginFormComponent { }
```

### ViewEncapsulation.ShadowDom
- **Casos de uso:** Componentes que necesitan aislamiento fuerte
- **Ideal para:** Componentes de bibliotecas reutilizables, widgets embebibles
- **Ejemplo:** Un reproductor de video personalizado, un editor WYSIWYG...

```typescript
@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class VideoPlayerComponent { }
```

### ViewEncapsulation.None
- **Casos de uso:** Estilos globales, temas, reset CSS
- **Ideal para:** Componentes cuyo propósito es definir estilos globales
- **Ejemplo:** Componente de tema, estilos de tipografía global...

```typescript
@Component({
  selector: 'app-theme-provider',
  template: '<ng-content></ng-content>',
  styleUrls: ['./theme.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ThemeProviderComponent { }
```

## 🧠 Consideraciones para elegir una estrategia

Al decidir qué estrategia de encapsulación usar, considera:

1. **Compatibilidad del navegador:** Si necesitas compatibilidad con navegadores antiguos, usa `Emulated`
2. **Nivel de aislamiento:** Para componentes complejos que necesitan fuerte aislamiento, considera `ShadowDom`
3. **Estilización global:** Para temas o estilos globales, `None` puede ser apropiado
4. **Bibliotecas de terceros:** Algunas bibliotecas CSS pueden no funcionar bien con `ShadowDom`
5. **Anidamiento de componentes:** Considera cómo afectará tu elección a los componentes anidados

## 💡 Técnicas para trabajar con encapsulación

### Compartir estilos entre componentes

1. **Estilos globales en styles.css**
   
   Coloca estilos comunes en el archivo `styles.css` (o `.scss`) raíz del proyecto:
   ```css
   /* styles.css (global) */
   .btn-primary {
     background-color: #007bff;
     color: white;
     padding: 8px 16px;
     border-radius: 4px;
   }
   ```

2. **Usar ViewEncapsulation.None para un componente de temas**
   
   ```typescript
   @Component({
     selector: 'app-theme',
     template: '<ng-content></ng-content>',
     styleUrls: ['./theme.component.scss'],
     encapsulation: ViewEncapsulation.None
   })
   export class ThemeComponent { }
   ```

3. **Importar archivos SCSS compartidos**
   
   Crear archivos SCSS compartidos:
   ```scss
   // _variables.scss
   $primary-color: #007bff;
   $border-radius: 4px;
   
   // Usar en componentes
   @import 'src/styles/variables';
   
   .card {
     border-radius: $border-radius;
     color: $primary-color;
   }
   ```

### Aplicar estilos desde un componente padre a un hijo (con encapsulación)

1. **Usar CSS Variables (Custom Properties)**

   ```css
   /* componente padre */
   :host {
     --child-heading-color: blue;
     --child-padding: 20px;
   }
   
   /* componente hijo */
   .heading {
     color: var(--child-heading-color, black); /* valor por defecto: black */
     padding: var(--child-padding, 10px);
   }
   ```

2. **Proyección de contenido con `ng-content`**

   ```html
   <!-- componente padre template -->
   <app-card>
     <h2 class="styled-by-parent">Este título será estilizado por el padre</h2>
   </app-card>
   
   <!-- componente padre CSS -->
   .styled-by-parent {
     color: red;
     font-size: 24px;
   }
   ```

3. **Pasar clases como inputs**

   ```typescript
   // componente hijo
   @Component({
     selector: 'app-button',
     template: `<button [class]="className">{{label}}</button>`
   })
   export class ButtonComponent {
     @Input() className: string;
     @Input() label: string;
   }
   
   // uso en el padre
   <app-button className="btn-large primary" label="Guardar"></app-button>
   ```

