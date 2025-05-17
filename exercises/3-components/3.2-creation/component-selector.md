# Selectores y Nomenclatura de Componentes en Angular

La elección de nombres y selectores adecuados para los componentes es fundamental para mantener una aplicación Angular bien organizada, mantenible y coherente. Esta guía cubre las convenciones y mejores prácticas para nombrar y seleccionar componentes.

## 🎯 Selectores de componentes

### Tipos de selectores

En Angular, puedes definir tres tipos de selectores para tus componentes:

1. **Selectores de elemento** (más común)
```typescript
@Component({
  selector: 'app-user-profile',
  // ...
})
```
```html
<app-user-profile></app-user-profile>
```

2. **Selectores de atributo**
```typescript
@Component({
  selector: '[app-highlight]',
  // ...
})
```
```html
<div app-highlight>Este div usa el componente como atributo</div>
```

3. **Selectores de clase CSS**
```typescript
@Component({
  selector: '.app-special-text',
  // ...
})
```
```html
<p class="app-special-text">Este párrafo usa el componente como clase</p>
```

## 📝 Convenciones de nomenclatura

### Prefijos de selector

Angular recomienda usar un prefijo coherente para todos los selectores de componentes:

```typescript
@Component({
  selector: 'app-dashboard',  // 'app-' es el prefijo predeterminado
  // ...
})
```

**Prefijos comunes:**
- `app-` - Prefijo predeterminado generado por Angular CLI
- `company-` - Prefijo personalizado para la empresa (ej. `acme-`)
- `feature-` - Prefijo para característica específica (ej. `admin-`)
- `lib-` - Prefijo para componentes de bibliotecas

### Configuración de prefijos personalizados

Puedes configurar un prefijo personalizado para todo el proyecto en `angular.json`:

```json
{
  "projects": {
    "your-project": {
      "prefix": "acme",
      // ...
    }
  }
}
```

Con esta configuración, `ng generate component` usará automáticamente el prefijo `acme-` en los selectores.

También puedes especificar un prefijo para un componente específico:

```bash
ng generate component user-profile --prefix=admin
# Genera un selector: admin-user-profile
```

### Nomenclatura de archivos

Angular sigue el estilo kebab-case (palabras en minúsculas separadas por guiones) para los nombres de archivos:

```
user-profile.component.ts
product-list.component.html
data-table.component.css
```

### Nomenclatura de clases

Para las clases de componentes, Angular usa PascalCase (cada palabra comienza con mayúscula) con el sufijo "Component":

```typescript
export class UserProfileComponent { }
export class ProductListComponent { }
export class DataTableComponent { }
```

## 🧩 Jerarquía de nomenclatura

Para aplicaciones grandes, considera una estructura de nomenclatura que refleje la jerarquía:

```
feature/subfeature/component-name
```

**Ejemplos:**
- `admin/users/user-list.component.ts`
- `shop/products/product-card.component.ts`
- `dashboard/widgets/weather-widget.component.ts`

## 📊 Estrategias de selectores por dominio

Para aplicaciones empresariales grandes, puedes organizar selectores por dominio:

```typescript
// Módulo de administración
@Component({
  selector: 'admin-user-table',
  // ...
})

// Módulo de tienda
@Component({
  selector: 'shop-product-card',
  // ...
})

// Módulo de dashboard
@Component({
  selector: 'dash-summary-widget',
  // ...
})
```

## 🔍 Selectores para diferentes tipos de componentes

### Componentes de presentación (UI)

```typescript
@Component({
  selector: 'app-ui-button',
  // ...
})
```

### Componentes de página o contenedor

```typescript
@Component({
  selector: 'app-user-dashboard-page',
  // ...
})
```

### Componentes de diseño

```typescript
@Component({
  selector: 'app-layout-sidebar',
  // ...
})
```

## 💡 Mejores prácticas para selectores

1. **Usa prefijos consistentes** para evitar colisiones con elementos HTML o componentes de terceros

2. **Prefiere selectores de elemento** para la mayoría de los componentes
   ```typescript
   selector: 'app-user-card'  // ✅ Buena práctica
   ```

3. **Usa selectores de atributo** para componentes que mejoran elementos HTML existentes
   ```typescript
   selector: '[app-tooltip]'  // ✅ Bueno para comportamientos añadidos
   ```

4. **Usa selectores de clase** con cautela, solo cuando sea lógico aplicar el componente como una clase CSS
   ```typescript
   selector: '.app-theme-section'  // ⚠️ Usar con moderación
   ```

5. **Nombres descriptivos y específicos**
   ```typescript
   selector: 'app-user-profile'  // ✅ Específico y claro
   selector: 'app-box'           // ❌ Demasiado genérico
   ```

6. **Mantén los selectores cortos pero significativos**
   ```typescript
   selector: 'app-product-category-navigation-breadcrumb'  // ❌ Demasiado largo
   selector: 'app-product-nav'                            // ✅ Conciso pero claro
   ```

## ⚠️ Errores comunes a evitar

1. **No usar selector en el decorador @Component**
   ```typescript
   @Component({
     // selector: '...',  // ❌ Olvidar definir el selector
     templateUrl: './my.component.html'
   })
   ```

2. **Usar nombres de elementos HTML nativos**
   ```typescript
   selector: 'button'  // ❌ Colisiona con <button> nativo
   ```

3. **Inconsistencia en el estilo de nomenclatura**
   ```typescript
   selector: 'appUserProfile'  // ❌ camelCase (inconsistente con kebab-case)
   ```

4. **Selectores sin prefijo**
   ```typescript
   selector: 'profile'  // ❌ Sin prefijo, riesgo de colisión
   ```

5. **Prefijos inconsistentes en la misma aplicación**
   ```typescript
   selector: 'app-header'   // Un componente
   selector: 'acme-footer'  // ❌ Otro componente con prefijo diferente
   ```

## 📝 Lista de verificación de nomenclatura

✅ Usa kebab-case para nombres de archivos
✅ Usa PascalCase para clases con sufijo Component
✅ Usa prefijos consistentes para selectores
✅ Asegúrate de que los selectores sean específicos pero concisos
✅ Elige el tipo de selector apropiado para cada caso de uso
✅ Considera reflejar la estructura modular en la nomenclatura

## 🌐 Ejemplos en contexto real

### Biblioteca de componentes UI

```typescript
@Component({
  selector: 'lib-button',
  // ...
})
export class ButtonComponent { }

@Component({
  selector: 'lib-card',
  // ...
})
export class CardComponent { }
```

### Aplicación corporativa

```typescript
@Component({
  selector: 'acme-login-form',
  // ...
})
export class LoginFormComponent { }

@Component({
  selector: 'acme-dashboard',
  // ...
})
export class DashboardComponent { }
```

### Componentes de características específicas

```typescript
@Component({
  selector: 'app-admin-user-table',
  // ...
})
export class AdminUserTableComponent { }

@Component({
  selector: 'app-shop-cart',
  // ...
})
export class ShopCartComponent { }
```

