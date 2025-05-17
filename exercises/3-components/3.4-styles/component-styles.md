# CSS en Componentes Angular

Angular ofrece múltiples formas de aplicar estilos a componentes, proporcionando flexibilidad y control sobre cómo se estiliza cada parte de tu aplicación.

## 🎨 Métodos para añadir estilos a componentes

### 1. Estilos inline con la propiedad `styles` del decorador `@Component`

```typescript
@Component({
  selector: 'app-hero',
  template: `
    <h1>{{hero.name}}</h1>
    <p class="description">{{hero.description}}</p>
  `,
  styles: [`
    h1 { 
      color: #336699; 
      font-size: 24px;
    }
    .description { 
      font-style: italic; 
      color: #666; 
    }
  `]
})
export class HeroComponent {
  // ...
}
```

**Ventajas:**
- Todo el componente está en un solo archivo
- Útil para componentes con estilos simples y breves
- No requiere archivos adicionales

**Desventajas:**
- Difícil de mantener para estilos extensos
- Sin resaltado de sintaxis en editores (a menos que usen literales etiquetados)
- Sin acceso a preprocesadores como SASS

### 2. Archivo de estilos externo con `styleUrls`

```typescript
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  // ...
}
```

**Contenido de `dashboard.component.css`**
```css
.dashboard {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
}

.dashboard-card {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
```

**Ventajas:**
- Mejor organización de código
- Soporte completo de IDE (resaltado de sintaxis, autocompletado)
- Facilita estilos más extensos y complejos

**Desventajas:**
- Requiere un archivo adicional

### 3. Múltiples archivos de estilos

```typescript
@Component({
  selector: 'app-complex-component',
  templateUrl: './complex-component.html',
  styleUrls: [
    './complex-component.base.css',
    './complex-component.theme.css',
    './complex-component.animations.css'
  ]
})
export class ComplexComponent {
  // ...
}
```

**Ventajas:**
- Permite organizar estilos por categorías o funcionalidad
- Facilita la gestión de componentes con muchos estilos
- Útil para separar estilos base, temáticos y animaciones

### 4. Estilos en el template HTML con etiqueta `<style>`

```typescript
@Component({
  selector: 'app-quick-note',
  template: `
    <style>
      .note {
        background-color: #fffde7;
        padding: 10px;
        border-left: 4px solid #ffeb3b;
      }
      .note-title {
        font-weight: bold;
        margin-bottom: 5px;
      }
    </style>
    
    <div class="note">
      <div class="note-title">{{title}}</div>
      <p>{{content}}</p>
    </div>
  `
})
export class QuickNoteComponent {
  // ...
}
```

**Ventajas:**
- Todo está en un único lugar
- Útil para componentes pequeños o prototipos rápidos

**Desventajas:**
- Mezcla HTML y CSS, haciendo el template menos legible
- Difícil de mantener en componentes grandes

## 🎭 Selectores especiales en estilos de componentes

### Selector :host

El selector `:host` permite aplicar estilos al elemento que hospeda el componente:

```css
:host {
  display: block;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 16px;
}

/* Con condiciones */
:host(.active) {
  border-color: #007bff;
  box-shadow: 0 0 8px rgba(0, 123, 255, 0.25);
}
```

### Selector :host-context

El selector `:host-context()` aplica estilos al componente basado en alguna condición de sus elementos ancestros:

```css
/* Estiliza el componente cuando algún ancestro tiene la clase .theme-dark */
:host-context(.theme-dark) {
  background-color: #333;
  color: white;
}

:host-context(.printing) h1 {
  color: black;
  font-size: 16pt;
}
```

### Selector ::ng-deep (obsoleto, pero aún usado)

El selector `::ng-deep` (o `/deep/` o `>>>`) permite que los estilos afecten a elementos hijos:

```css
/* Afecta a todos los elementos .btn, incluso dentro de componentes hijos */
::ng-deep .btn {
  border-radius: 0;
}
```

**⚠️ Nota**: `::ng-deep` está obsoleto y será eliminado en futuras versiones. Se recomienda usar otras técnicas para estilos globales.

## 📁 Preprocesadores CSS en Angular

Angular soporta varios preprocesadores de CSS que pueden ser configurados en el momento de crear un componente o proyecto.

### SCSS/SASS

```typescript
@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.scss']
})
export class FeatureComponent { }
```

```scss
// feature.component.scss
$primary-color: #336699;
$border-radius: 4px;

.feature {
  &-header {
    color: $primary-color;
    font-weight: bold;
  }
  
  &-body {
    padding: 16px;
    border: 1px solid lighten($primary-color, 30%);
    border-radius: $border-radius;
  }
  
  &-footer {
    margin-top: 8px;
    font-size: 0.9em;
  }
}
```

### LESS

```typescript
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.less']
})
export class CardComponent { }
```

### Stylus

```typescript
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.styl']
})
export class ProfileComponent { }
```

## 🔧 Configurando el preprocesador por defecto

Al crear un nuevo proyecto, puedes especificar el preprocesador CSS por defecto:

```bash
ng new my-app --style=scss
# o
ng new my-app --style=less
# o
ng new my-app --style=stylus
```

Para un componente específico:

```bash
ng generate component my-component --style=scss
```

## 🔄 CSS variables y temas dinámicos

Las variables CSS son una excelente manera de implementar temas y cambios dinámicos de estilo:

```css
:root {
  --primary-color: #336699;
  --secondary-color: #ff6b6b;
  --text-color: #333;
  --background-color: #fff;
}

.dark-theme {
  --primary-color: #66a3ff;
  --secondary-color: #ff9e9e;
  --text-color: #f0f0f0;
  --background-color: #222;
}

.button {
  background-color: var(--primary-color);
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
}
```

## 📱 Estilos responsivos en componentes

```css
.dashboard {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

@media (min-width: 768px) {
  .dashboard {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1200px) {
  .dashboard {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

## 🚀 Buenas prácticas para estilos en componentes

1. **Utiliza selectores de clases en lugar de elementos**
   ```css
   /* ✅ Bueno: Usa selectores de clase */
   .user-list { }
   
   /* ❌ Evita: Demasiado general, puede causar conflictos */
   ul { }
   ```

2. **Estructura tus estilos con BEM, SMACSS o similar**
   ```css
   /* Usando nomenclatura BEM */
   .card { }
   .card__header { }
   .card__body { }
   .card__footer { }
   
   .card--featured { }
   ```

3. **Limita la profundidad de anidamiento**
   ```scss
   /* ✅ Bueno: Anidamiento limitado */
   .article {
     &__header { }
     &__body { }
     &__footer { }
   }
   
   /* ❌ Evita: Demasiado anidamiento */
   .article {
     .header {
       .title {
         span {
           a { }
         }
       }
     }
   }
   ```

4. **Mantén los estilos específicos al componente**
   - Evita estilos demasiado genéricos
   - Nombra clases con prefijos basados en el componente
   - Utiliza la encapsulación de vistas adecuada

5. **Extrae estilos comunes a archivos globales o componentes de estilo**
   - Usa un archivo de estilos global para reset, tipografía y variables
   - Crea componentes reutilizables para patrones comunes
   - Considera usar una biblioteca de componentes para consistencia

