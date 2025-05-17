# Módulos de Características en Angular

Los módulos de características (feature modules) encapsulan una funcionalidad específica de una aplicación, facilitando la organización del código en dominios lógicos y habilitando la carga diferida (lazy loading).

## 🧩 ¿Qué es un módulo de características?

Un módulo de características es un NgModule que organiza y agrupa código relacionado con una funcionalidad específica, como:

- Administración de usuarios
- Dashboard
- Carrito de compras
- Autenticación
- Área de administración

## 🎯 Beneficios de los módulos de características

- **Organización clara**: Separa la aplicación en dominios funcionales
- **Mantenibilidad**: Facilita la comprensión y el mantenimiento del código
- **Lazy loading**: Permite cargar el código bajo demanda
- **Escalabilidad**: Facilita que varios equipos trabajen en diferentes características
- **Pruebas**: Simplifica el testing al aislar funcionalidades

## 📊 Estructura de un módulo de características

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Componentes específicos de esta característica
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductFormComponent } from './product-form/product-form.component';

// Servicios específicos
import { ProductService } from './services/product.service';

// Routing para esta característica
import { ProductsRoutingModule } from './products-routing.module';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductFormComponent
  ],
  imports: [
    CommonModule,         // En lugar de BrowserModule
    FormsModule,
    ProductsRoutingModule // Módulo de routing específico
  ],
  providers: [
    ProductService        // Servicios específicos de esta característica
  ]
})
export class ProductsModule { }
```

## 🚀 Implementación de un módulo de características

### 1. Creación del módulo con CLI

```bash
ng generate module features/products
```

### 2. Generación de componentes para el módulo

```bash
ng generate component features/products/product-list --module=features/products
ng generate component features/products/product-detail --module=features/products
```

### 3. Creación de servicios específicos

```bash
ng generate service features/products/services/product
```

### 4. Configuración del routing para carga diferida

Primero, crea un módulo de routing para la característica:

```bash
ng generate module features/products/products-routing --flat
```

En `products-routing.module.ts`:

```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: ':id', component: ProductDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
```

En el routing principal (`app-routing.module.ts`):

```typescript
const routes: Routes = [
  {
    path: 'products',
    loadChildren: () => import('./features/products/products.module')
                         .then(m => m.ProductsModule)
  }
];
```

## 🛠️ Tipos de módulos de características

### Módulos de dominio

Representan conceptos del dominio de negocio como usuarios, productos, pedidos.
```typescript
@NgModule({...})
export class ProductsModule { }
```

### Módulos de routing

Proporcionan la configuración de routing para una característica.
```typescript
@NgModule({...})
export class ProductsRoutingModule { }
```

### Módulos de widget

Contienen componentes reutilizables específicos para una característica.
```typescript
@NgModule({...})
export class ProductWidgetsModule { }
```

## 📂 Estructura de carpetas recomendada

```
src/app/
  features/              # Carpeta para todas las características
    products/            # Característica específica
      components/        # Componentes de la característica
      services/          # Servicios específicos
      models/            # Interfaces y modelos
      guards/            # Guards específicos
      products.module.ts # Módulo principal
      products-routing.module.ts # Configuración de routing
```

## 💡 Buenas prácticas

1. **Nombrado claro**: Usa nombres descriptivos que indiquen la funcionalidad
2. **Cohesión**: Incluye solo componentes relacionados con la característica
3. **Lazy Loading**: Configura tus módulos para carga diferida cuando sea posible
4. **Módulos independientes**: Minimiza las dependencias entre módulos de características
5. **Servicios específicos**: Proporciona servicios limitados al contexto de la característica
6. **CommonModule**: Usa CommonModule en lugar de BrowserModule para módulos de características

