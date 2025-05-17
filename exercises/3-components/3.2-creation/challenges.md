# Ejercicios Prácticos de Creación de Componentes

Estos ejercicios te ayudarán a practicar diferentes técnicas de creación, configuración y uso de componentes en Angular. Cada ejercicio se enfoca en diferentes aspectos y complejidades.

## 🎯 Reto 1: Creación de componentes con CLI

**Objetivo:** Crear varios componentes con diferentes opciones usando Angular CLI.

**Tareas:**
1. Crea un componente llamado "header" que use estilos y plantilla en línea
2. Crea un componente "footer" con archivos separados y sin tests
3. Crea un componente "sidebar" dentro de una carpeta "layout" con SCSS
4. Crea un componente "button" en una carpeta "shared/ui" y expórtalo
5. Crea un componente "user-profile" usando detección de cambios OnPush

**Comandos a utilizar:**
```bash
# Para el ejercicio 1
ng generate component header --inline-template --inline-style

# Para el ejercicio 2
ng generate component footer --skip-tests

# Para el ejercicio 3
ng generate component layout/sidebar --style=scss

# Para el ejercicio 4
ng generate component shared/ui/button --export

# Para el ejercicio 5
ng generate component user-profile --change-detection=OnPush
```

**Resultado esperado:**
Una estructura de archivos organizada con componentes de diferentes características y opciones, y módulos correctamente actualizados.

## 🎯 Reto 2: Componente de tarjeta de producto

**Objetivo:** Crear manualmente un componente "ProductCardComponent" que muestre información de un producto con estilos atractivos.

**Tareas:**
1. Crea la estructura de carpetas y los archivos necesarios
2. Implementa un componente que acepte datos de producto como entrada
3. Crea un diseño con imagen, título, precio y botón de compra
4. Añade interacción para marcar productos como favoritos
5. Estiliza el componente para que luzca profesional

**Estructura básica:**
```typescript
// product-card.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product: any;
  @Output() addToCart = new EventEmitter<any>();
  @Output() toggleFavorite = new EventEmitter<any>();
  
  // Implementa los métodos necesarios
}
```

**HTML de ejemplo:**
```html
<div class="product-card">
  <div class="favorite-icon" (click)="onToggleFavorite()">
    <!-- Icono de favorito -->
  </div>
  <img [src]="product.imageUrl" [alt]="product.name">
  <h3>{{ product.name }}</h3>
  <p class="price">${{ product.price.toFixed(2) }}</p>
  <button (click)="onAddToCart()">Add to Cart</button>
</div>
```

**Resultado esperado:**
Un componente de tarjeta de producto reutilizable que pueda mostrar diferentes productos y permitir interacciones básicas.

## 🎯 Reto 3: Sistema de componentes de notificación

**Objetivo:** Crear un conjunto de componentes relacionados para un sistema de notificaciones.

**Tareas:**
1. Crea un componente contenedor `NotificationsComponent`
2. Crea un subcomponente `NotificationItemComponent` para cada notificación individual
3. Implementa diferentes tipos de notificaciones (info, éxito, advertencia, error)
4. Añade animaciones básicas para entrada y salida de notificaciones
5. Implementa la funcionalidad para cerrar notificaciones

**Generación de componentes:**
```bash
# Componente contenedor
ng generate component notifications

# Componente para cada notificación
ng generate component notifications/notification-item
```

**Estructura sugerida:**
```typescript
// notifications/notification-item/notification-item.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

export type NotificationType = 'info' | 'success' | 'warning' | 'error';

export interface Notification {
  id: number;
  message: string;
  type: NotificationType;
  autoClose?: boolean;
}

@Component({
  selector: 'app-notification-item',
  templateUrl: './notification-item.component.html',
  styleUrls: ['./notification-item.component.css']
})
export class NotificationItemComponent {
  @Input() notification!: Notification;
  @Output() close = new EventEmitter<number>();
  
  // Implementa los métodos necesarios
}
```

**Contenedor de notificaciones:**
```typescript
// notifications/notifications.component.ts
import { Component } from '@angular/core';
import { Notification } from './notification-item/notification-item.component';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent {
  notifications: Notification[] = [];
  
  addNotification(message: string, type: 'info' | 'success' | 'warning' | 'error'): void {
    // Implementa la lógica para añadir notificaciones
  }
  
  removeNotification(id: number): void {
    // Implementa la lógica para eliminar notificaciones
  }
}
```

**Resultado esperado:**
Un sistema de notificaciones funcional que pueda mostrar diferentes tipos de mensajes y permitir cerrarlos.

## 🎯 Reto 4: Componente de tabla de datos con paginación

**Objetivo:** Crear un componente de tabla de datos reutilizable con capacidades de paginación.

**Tareas:**
1. Genera un componente `DataTableComponent` con Angular CLI
2. Implementa entradas para datos, configuración de columnas y opciones de paginación
3. Crea un subcomponente `PaginatorComponent` para manejar la navegación entre páginas
4. Añade soporte para ordenación de columnas
5. Estiliza la tabla para que sea fácil de leer y responsive

**Generación de componentes:**
```bash
ng generate component shared/data-table
ng generate component shared/data-table/paginator
```

**Estructura sugerida:**
```typescript
// shared/data-table/data-table.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface TableColumn {
  property: string;
  label: string;
  sortable?: boolean;
}

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent {
  @Input() data: any[] = [];
  @Input() columns: TableColumn[] = [];
  @Input() pageSize = 10;
  @Input() totalItems = 0;
  
  @Output() pageChange = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<{column: string, direction: 'asc' | 'desc'}>();
  
  currentPage = 1;
  
  // Implementa métodos para paginación y ordenación
}
```

**Resultado esperado:**
Un componente de tabla reutilizable que pueda mostrar diferentes conjuntos de datos con paginación y ordenación.

## 🎯 Reto 5: Sistema de componentes de formulario dinámicos

**Objetivo:** Crear una biblioteca de componentes de formulario que se puedan ensamblar dinámicamente.

**Tareas:**
1. Crea un módulo compartido para los componentes de formulario
2. Implementa componentes base para diferentes tipos de entrada:
   - TextInputComponent
   - SelectComponent
   - CheckboxComponent
   - RadioGroupComponent
3. Crea un componente contenedor `DynamicFormComponent` que pueda generar formularios a partir de configuración
4. Implementa validación para los campos
5. Proporciona un mecanismo para manejar envíos de formulario

**Generación del módulo y componentes:**
```bash
ng generate module shared/form
ng generate component shared/form/text-input --export
ng generate component shared/form/select --export
ng generate component shared/form/checkbox --export
ng generate component shared/form/radio-group --export
ng generate component shared/form/dynamic-form --export
```

**Ejemplo de configuración para un formulario dinámico:**
```typescript
const formConfig = [
  {
    type: 'text',
    name: 'name',
    label: 'Full Name',
    placeholder: 'Enter your full name',
    validators: { required: true, minLength: 3 }
  },
  {
    type: 'select',
    name: 'country',
    label: 'Country',
    options: [
      { value: 'us', label: 'United States' },
      { value: 'ca', label: 'Canada' },
      { value: 'mx', label: 'Mexico' }
    ],
    validators: { required: true }
  },
  {
    type: 'checkbox',
    name: 'terms',
    label: 'I accept the terms and conditions',
    validators: { required: true }
  }
];
```

**Resultado esperado:**
Un sistema flexible de componentes de formulario que se pueda configurar dinámicamente para crear diferentes tipos de formularios.

## 🎯 Reto 6: Refactorización de componente monolítico

**Objetivo:** Tomar un componente grande y complejo y refactorizarlo en múltiples componentes más pequeños y específicos.

**Componente monolítico inicial:**
```typescript
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  users = [];
  products = [];
  orders = [];
  statistics = { totalSales: 0, totalUsers: 0, averageOrderValue: 0 };
  notifications = [];
  
  // Muchos métodos y lógica diversa
  
  constructor(
    private userService: UserService,
    private productService: ProductService,
    private orderService: OrderService,
    private notificationService: NotificationService
  ) {}
  
  ngOnInit() {
    // Carga inicial de todos los datos
  }
  
  // Métodos para gestionar usuarios, productos, órdenes, estadísticas, etc.
}
```

**Tareas:**
1. Identifica componentes lógicos dentro del monolito
2. Crea componentes más pequeños y específicos:
   - UserListComponent
   - ProductListComponent
   - OrderListComponent
   - StatisticsComponent
   - NotificationsComponent
3. Refactoriza el dashboard para utilizar estos componentes
4. Asegúrate de mantener la funcionalidad original intacta
5. Mejora la estructura para facilitar futuras modificaciones

**Resultado esperado:**
Una estructura modular de componentes más pequeños y mantenibles que trabajan juntos para proporcionar la misma funcionalidad que el componente monolítico original.

## 🔍 Verificación de los ejercicios

Para cada ejercicio, verifica que:

1. Los componentes se rendericen correctamente
2. La funcionalidad sea la esperada
3. Los estilos se apliquen adecuadamente
4. Los componentes estén declarados en los módulos correctos
5. La interacción entre componentes funcione como se espera

