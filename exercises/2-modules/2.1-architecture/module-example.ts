// Ejemplo práctico de un módulo Angular
// Este archivo muestra la estructura de un módulo de características típico

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Componentes de este módulo
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductFormComponent } from './product-form/product-form.component';

// Directivas específicas del módulo
import { HighlightProductDirective } from './directives/highlight-product.directive';

// Pipes específicos del módulo
import { ProductCategoryPipe } from './pipes/product-category.pipe';

// Servicios específicos del módulo
import { ProductService } from './services/product.service';
import { ProductCategoryService } from './services/product-category.service';

// Módulos compartidos propios
import { ProductWidgetsModule } from './widgets/product-widgets.module';

// Rutas para este módulo
const routes = [
  { path: 'products', component: ProductListComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'products/new', component: ProductFormComponent },
  { path: 'products/:id/edit', component: ProductFormComponent }
];

@NgModule({
  // Componentes, directivas y pipes que pertenecen a este módulo
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductFormComponent,
    HighlightProductDirective,
    ProductCategoryPipe
  ],

  // Otros módulos cuyos componentes exportados, directivas o pipes son requeridos por este módulo
  imports: [
    // Módulos Angular
    CommonModule,
    FormsModule,

    // Routing para este módulo
    RouterModule.forChild(routes),

    // Módulos propios
    ProductWidgetsModule
  ],

  // Componentes, directivas y pipes de este módulo que estarán disponibles
  // para otros módulos que importen este módulo
  exports: [
    ProductListComponent,
    HighlightProductDirective,
    ProductCategoryPipe
  ],

  // Servicios que este módulo contribuye a la colección global de servicios
  // Angular 6+ recomienda usar @Injectable({providedIn: 'root'}) en su lugar
  // para servicios singleton a nivel de aplicación
  providers: [
    // Servicios específicos para este módulo
    ProductCategoryService,

    // Para servicios que no son singleton o requieren configuración especial
    {
      provide: ProductService,
      useClass: ProductService
    }
  ]
})
export class ProductsModule {
  // El cuerpo de la clase suele estar vacío para módulos simples

  // Para módulos más complejos, puedes agregar constructores
  // y métodos estáticos para configuración adicional

  // Constructor para inyección de dependencias si es necesario
  constructor() {
    console.log('ProductsModule loaded');
  }

  // Método estático para crear módulos configurables (patrón de módulo con providers)
  static forRoot(config: any) {
    return {
      ngModule: ProductsModule,
      providers: [
        { provide: 'config', useValue: config }
      ]
    };
  }
}

