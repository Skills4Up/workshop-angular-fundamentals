// Ejemplo práctico de dependencias entre módulos en Angular
// Este archivo muestra diferentes patrones de importación y exportación

// ============================================================================
// DEFINICIÓN DE MÓDULOS Y SUS DEPENDENCIAS
// ============================================================================

// ---------------------------------
// 1. AppModule (Módulo raíz)
// ---------------------------------
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { FeaturesModule } from './features/features.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // Módulos de Angular
    BrowserModule, // ¡Importante! BrowserModule solo se importa en el módulo raíz
    HttpClientModule,

    // Módulos propios
    CoreModule, // Contiene servicios singleton
    SharedModule, // Componentes compartidos
    FeaturesModule, // Características no lazy-loaded

    // Routing principal (siempre al final)
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

// ---------------------------------
// 2. SharedModule (Módulo compartido)
// ---------------------------------
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Componentes compartidos
import { ButtonComponent } from './components/button.component';
import { CardComponent } from './components/card.component';
import { LoadingSpinnerComponent } from './components/loading-spinner.component';

// Directivas compartidas
import { HighlightDirective } from './directives/highlight.directive';

// Pipes compartidos
import { TruncatePipe } from './pipes/truncate.pipe';

@NgModule({
  imports: [
    // Módulos Angular necesarios
    CommonModule
  ],
  declarations: [
    // Declaramos todos nuestros componentes, directivas y pipes
    ButtonComponent,
    CardComponent,
    LoadingSpinnerComponent,
    HighlightDirective,
    TruncatePipe
  ],
  exports: [
    // Re-exportamos módulos de Angular comunes
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    // Exportamos nuestros componentes para que sean usables
    ButtonComponent,
    CardComponent,
    LoadingSpinnerComponent,
    HighlightDirective,
    TruncatePipe
  ]
})
export class SharedModule { }

// ---------------------------------
// 3. CoreModule (Servicios singleton)
// ---------------------------------
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

// Servicios core
import { AuthService } from './services/auth.service';
import { LoggingService } from './services/logging.service';

// Interceptores
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { LoggingInterceptor } from './interceptors/logging.interceptor';

// Componentes que solo se usan una vez
import { HeaderComponent } from './components/header.component';
import { FooterComponent } from './components/footer.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  exports: [
    // Solo exportamos los componentes que se usarán en AppComponent
    HeaderComponent,
    FooterComponent
  ],
  providers: [
    // Servicios singleton
    AuthService,
    LoggingService,

    // Interceptores HTTP
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true }
  ]
})
export class CoreModule {
  // Previene importación múltiple del CoreModule
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule ya está cargado. Importa solo en AppModule.');
    }
  }
}

// ---------------------------------
// 4. FeaturesModule (Características no lazy-loaded)
// ---------------------------------
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  imports: [
    SharedModule // Importamos el módulo compartido para usar sus exportaciones
  ],
  declarations: [
    HomeComponent,
    AboutComponent,
    ContactComponent
  ],
  exports: [
    // Exportamos los componentes para que los use el router principal
    HomeComponent,
    AboutComponent,
    ContactComponent
  ]
})
export class FeaturesModule { }

// ---------------------------------
// 5. ProductsModule (Lazy-loaded feature module)
// ---------------------------------
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { ProductListComponent } from './components/product-list.component';
import { ProductDetailComponent } from './components/product-detail.component';
import { ProductService } from './services/product.service';

// Rutas para lazy loading
const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: ':id', component: ProductDetailComponent }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes) // Configuración de rutas para lazy loading
  ],
  declarations: [
    ProductListComponent,
    ProductDetailComponent
  ],
  providers: [
    // Servicio específico para esta característica
    ProductService
  ]
  // No necesitamos exports porque las rutas resolverán a los componentes directamente
})
export class ProductsModule { }

// ---------------------------------
// 6. AppRoutingModule (Configuración de rutas)
// ---------------------------------
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './features/home/home.component';
import { AboutComponent } from './features/about/about.component';
import { ContactComponent } from './features/contact/contact.component';

// Rutas principales
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  // Lazy loading para el módulo de productos
  {
    path: 'products',
    loadChildren: () => import('./features/products/products.module').then(m => m.ProductsModule)
  },
  // Ruta comodín para 404
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }

// ============================================================================
// DIAGRAMA DE DEPENDENCIAS
// ============================================================================

/**
 * Diagrama de dependencias de módulos:
 *
 *                   ┌──────────────┐
 *                   │  AppModule   │
 *                   └──────┬───────┘
 *                          │ imports
 *                          ▼
 *       ┌─────────┬────────┼──────────┬──────────┐
 *       │         │        │          │          │
 * ┌─────▼───┐ ┌───▼────┐ ┌─▼───┐ ┌────▼─────┐ ┌──▼───┐
 * │CoreModule│ │SharedModule│ │BrowserModule│ │FeaturesModule│ │AppRoutingModule│
 * └─────┬───┘ └───┬────┘ └─────┘ └────┬─────┘ └──┬───┘
 *       │         │                   │          │
 *       │    exports    imports       │     configures
 *       │         │       ┌───────────┘          │
 *       │         │       │                      │
 *       │    ┌────▼───────▼──┐             ┌─────▼────┐
 *       │    │               │             │          │
 *       └────► Components,   │             │  Routes  │
 *            │ Directives,   │             │          │
 *            │ Pipes         │             └──────────┘
 *            └───────────────┘
 *
 *
 * Relaciones principales:
 *
 * 1. AppModule importa todos los módulos principales
 * 2. FeaturesModule importa SharedModule para usar sus componentes
 * 3. ProductsModule es cargado mediante lazy loading
 * 4. CoreModule contiene servicios singleton y se importa solo en AppModule
 * 5. SharedModule exporta componentes, directivas y pipes reutilizables
 */

// Nota: Este archivo es solo un ejemplo para ilustrar la estructura y relaciones
// entre módulos. No está destinado a ser compilado directamente.

