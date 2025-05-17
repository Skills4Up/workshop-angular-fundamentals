# Ejercicios Prácticos de Importación y Exportación

Estos ejercicios te ayudarán a practicar los conceptos de importación y exportación de módulos en Angular para crear una aplicación modular y bien estructurada.

## 🎯 Reto 1: Estructura básica de módulos

  ** Objetivo:** Crear y conectar una estructura básica de módulos en una aplicación Angular.

** Tareas:**
  1. Crea un`AppModule`(módulo raíz)
2. Genera un `SharedModule` para componentes compartidos
3. Crea un `UsersModule` para la funcionalidad de usuarios
4. Importa el `SharedModule` en el`UsersModule`
5. Importa ambos módulos en el`AppModule`

** Plantilla de código:**

```typescript
// app.module.ts
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    // Importa los módulos necesarios aquí
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

// shared.module.ts
@NgModule({
  declarations: [
    // Declara componentes compartidos
  ],
  imports: [
    CommonModule
  ],
  exports: [
    // Exporta componentes compartidos
  ]
})
export class SharedModule { }

// users.module.ts
@NgModule({
  declarations: [
    // Declara componentes de usuarios
  ],
  imports: [
    // Importa los módulos necesarios
  ]
})
export class UsersModule { }
```

## 🎯 Reto 2: Exportación e importación de componentes

** Objetivo:** Practicar la exportación e importación de componentes entre módulos.

** Tareas:**
  1. Genera un componente `ButtonComponent` en el`SharedModule`
2. Exporta este componente desde el`SharedModule`
3. Genera un `UserListComponent` en el`UsersModule`
4. Usa el `ButtonComponent` dentro del`UserListComponent`
5. Asegúrate de importar correctamente el `SharedModule` en el`UsersModule`

  ** Comandos útiles:**
```bash
ng generate component shared/components/button --export
ng generate component users/user-list
```

** Plantilla de código para user - list.component.html:**
```html
<div class="user-list">
  <h2>User List</h2>
  <app-button label="Add User"></app-button>
  <!-- Deberías poder usar el componente de botón aquí -->
</div>
```

## 🎯 Reto 3: Re - exportación de módulos

** Objetivo:** Aplicar el patrón de re - exportación para simplificar las importaciones.

** Tareas:**
1. Modifica el `SharedModule` para importar y re - exportar`CommonModule` y`FormsModule`
2. Crea un componente `UserFormComponent` en `UsersModule` que use directivas de formulario
3. Verifica que `UsersModule` solo necesite importar`SharedModule`(sin importar`FormsModule` directamente)

** Plantilla de código para SharedModule:**
```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from './components/button/button.component';

@NgModule({
  declarations: [
    ButtonComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    // Re-exporta CommonModule y FormsModule junto con ButtonComponent
    // Completa el código aquí
  ]
})
export class SharedModule { }
```

** Plantilla para UserFormComponent:**

```jsx
// user-form.component.html
<form #userForm="ngForm">
  <div>
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" [(ngModel)]="user.name" required>
  </div>
  <app-button label="Save"></app-button>
</form>

// user-form.component.ts
@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html'
})
export class UserFormComponent {
  user = { name: '' };
}
```

## 🎯 Reto 4: Módulo con servicios y lazy loading

** Objetivo:** Configurar un módulo con servicios y lazy loading.

** Tareas:**
1. Crea un módulo `AdminModule` con su propio archivo de routing
2. Configura el lazy loading para este módulo en el router principal
3. Crea un servicio `AdminService` para este módulo
4. Proporciona el servicio solo en el ámbito del`AdminModule`

** Comandos útiles:**
```bash
ng generate module admin --routing
ng generate component admin/admin-dashboard
ng generate service admin/services/admin
```

** Plantilla para app - routing.module.ts:**
```typescript
const routes: Routes = [
  { path: '', component: HomeComponent },
  // Agrega la configuración de lazy loading para AdminModule aquí
  {
    path: 'admin',
    loadChildren: () => // Completa el código
  }
];
```

** Plantilla para admin.module.ts:**
```typescript
@NgModule({
  declarations: [
    AdminDashboardComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  providers: [
    // Proporciona el AdminService aquí
  ]
})
export class AdminModule { }
```

## 🎯 Reto 5: Organización de módulos avanzada

** Objetivo:** Implementar una estructura de módulos más compleja con subcaracterísticas.

** Tareas:**
1. Crea una estructura de módulos para un e - commerce:
- `ProductsModule` - Módulo principal de productos
- `ProductCatalogModule` - Subcaracterística para el catálogo
- `ProductReviewsModule` - Subcaracterística para reseñas
2. Configura correctamente las importaciones y exportaciones
3. Implementa servicios para compartir datos entre estos módulos

** Estructura esperada:**
```
src/app/
  features/
    products/
      products.module.ts
      catalog/
        product-catalog.module.ts
        components/
          product-list.component.ts
          product-detail.component.ts
        services/
          catalog.service.ts
      reviews/
        product-reviews.module.ts
        components/
          review-list.component.ts
          review-form.component.ts
        services/
          reviews.service.ts
      shared/
        product-card.component.ts
        product.model.ts
        products.service.ts
```

** Código para ProductsModule:**
```typescript
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ProductCatalogModule,
    ProductReviewsModule
  ],
  declarations: [],
  // ¿Es necesario exportar algo desde aquí?
})
export class ProductsModule { }
```

## 🎯 Reto 6: Evitar dependencias circulares

  ** Objetivo:** Refactorizar código para evitar dependencias circulares.

** Problema:**
  Tienes dos módulos que dependen entre sí:
- `UserModule` importa `TeamModule` para usar`TeamListComponent`
- `TeamModule` importa `UserModule` para usar`UserProfileComponent`

** Solución propuesta:**
1. Identifica el problema de dependencia circular
2. Crea un tercer módulo `UserTeamSharedModule` para romper la dependencia
3. Mueve los componentes compartidos a este nuevo módulo
4. Refactoriza las importaciones apropiadamente

** Plantilla de código inicial(con problema):**
```typescript
// user.module.ts
@NgModule({
  declarations: [UserProfileComponent],
  imports: [CommonModule, TeamModule],
  exports: [UserProfileComponent]
})
export class UserModule { }

// team.module.ts
@NgModule({
  declarations: [TeamListComponent],
  imports: [CommonModule, UserModule],
  exports: [TeamListComponent]
})
export class TeamModule { }
```

** Directrices para tu solución:**
- Crea un `UserTeamSharedModule` que declare y exporte los componentes compartidos
- Modifica`UserModule` y `TeamModule` para importar este nuevo módulo
- Asegúrate de que no queden dependencias circulares

## 🔍 Verificación de conocimientos

1. ¿Cuál es la diferencia entre declarar y exportar un componente ?
2. ¿Qué ocurre si intentas usar un componente que está declarado en un módulo que has importado, pero no ha sido exportado ?
3. ¿Cuáles son las ventajas de re - exportar módulos como FormsModule desde un SharedModule ?
4. ¿Cómo afecta la configuración de módulos a la estrategia de lazy loading ?
5. ¿Cuál es la mejor manera de proporcionar servicios ? ¿En el módulo raíz, en un módulo específico o con providedIn: 'root' ?

