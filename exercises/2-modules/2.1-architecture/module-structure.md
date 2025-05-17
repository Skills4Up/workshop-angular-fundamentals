# Estructura de un Módulo en Angular

Los módulos en Angular están definidos por la clase `NgModule`, que es un decorador que proporciona metadatos sobre cómo ensamblar un bloque de código relacionado.

## 🧩 Anatomía del Decorador NgModule

Un módulo Angular típico se define así:

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyComponent } from './my-component.component';
import { MyDirective } from './my-directive.directive';
import { MyPipe } from './my-pipe.pipe';
import { MyService } from './my-service.service';

@NgModule({
  declarations: [
    MyComponent,
    MyDirective,
    MyPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MyComponent,
    MyDirective
  ],
  providers: [
    MyService
  ]
})
export class MyModule { }
```

## 📑 Metadatos principales del NgModule

Los metadatos del decorador `@NgModule` incluyen:

### 1. `declarations` (Declaraciones)

Un array que contiene los **componentes**, **directivas** y **pipes** que pertenecen a este módulo.

```typescript
declarations: [
  ProductListComponent,
  ProductCardComponent,
  HighlightDirective,
  TruncatePipe
]
```

**Reglas importantes**:
- Cada componente, directiva o pipe debe declararse en **exactamente un módulo**
- Sólo se pueden usar los elementos declarados o importados por el módulo
- Un elemento declarado en un módulo no está automáticamente disponible fuera de ese módulo

### 2. `imports` (Importaciones)

Un array de otros módulos cuyas **exportaciones** se necesitan en este módulo.

```typescript
imports: [
  CommonModule,
  FormsModule,
  RouterModule,
  SharedModule
]
```

**¿Qué importar?**:
- Módulos que contienen componentes, directivas o pipes que utilizarás
- Módulos que proporcionan funcionalidades necesarias (FormsModule, HttpClientModule, etc.)
- Otros módulos de características o compartidos de tu aplicación

### 3. `exports` (Exportaciones)

Un array de componentes, directivas y pipes que **deben estar disponibles** para los módulos que importen este módulo.

```typescript
exports: [
  ProductCardComponent,
  HighlightDirective,
  TruncatePipe
]
```

**Consideraciones**:
- Solo exporta lo que otros módulos necesitarán usar
- Puedes re-exportar módulos completos que has importado
- Lo que no se exporta explícitamente no será accesible fuera del módulo

### 4. `providers` (Proveedores)

Un array de **servicios** (o cualquier valor) disponible para la inyección de dependencias.

```typescript
providers: [
  ProductService,
  { provide: LoggerService, useClass: ProductionLoggerService }
]
```

**Características**:
- Los servicios declarados aquí son accesibles en toda la aplicación
- Angular 6+ recomienda usar el decorador `@Injectable({ providedIn: 'root' })` en su lugar
- Útil para sobrescribir servicios o proporcionar valores configurables

### 5. `bootstrap` (Arranque)

Un array con el **componente principal** que debe cargarse cuando se inicia la aplicación (solo usado en el módulo raíz AppModule).

```typescript
bootstrap: [
  AppComponent
]
```

### 6. Otros metadatos (menos comunes)

- `entryComponents`: Componentes que se crean dinámicamente (menos relevante en Angular moderno)
- `schemas`: Esquemas adicionales de DOM para el compilador Angular
- `id`: Identificador único para el NgModule (raro en aplicaciones típicas)

## 🔄 Tipos de Módulos

Angular reconoce varios tipos conceptuales de módulos:

1. **Módulo Raíz** (AppModule): El módulo principal que arranca la aplicación
2. **Módulos de Características**: Organizan código relacionado a una característica específica
3. **Módulos Compartidos**: Contienen componentes/directivas reusables por múltiples módulos
4. **Módulos de Routing**: Configuran las rutas para una sección de la aplicación
5. **Módulos de Servicios**: Proveen servicios configurados (menos comunes)
6. **Módulos de Widgets**: Encapsulan componentes visuales reutilizables

## 📋 Buenas prácticas

- **Cohesión**: Cada módulo debe tener un propósito único y claro
- **Organización**: Agrupar código relacionado en el mismo módulo
- **Encapsulación**: Exponer solo lo necesario mediante exports
- **Claridad**: Nombrar módulos con un sufijo `Module` (ej: `ProductsModule`)
- **Tamaño**: Evitar módulos demasiado grandes (división por características)

