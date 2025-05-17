# Exportación de Elementos en Angular

La exportación es el mecanismo por el cual un módulo Angular hace sus componentes, directivas y pipes disponibles para otros módulos que lo importan.

## 🧩 Fundamentos de la exportación

En Angular, la exportación ocurre a través del arreglo `exports` en el decorador `@NgModule`:

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { CardComponent } from './components/card/card.component';
import { HighlightDirective } from './directives/highlight.directive';
import { TruncatePipe } from './pipes/truncate.pipe';

@NgModule({
  declarations: [
    ButtonComponent,
    CardComponent,
    HighlightDirective,
    TruncatePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    // Explícitamente hacemos estos elementos disponibles para otros módulos
    ButtonComponent,
    CardComponent,
    HighlightDirective,
    TruncatePipe
  ]
})
export class SharedModule { }
```

## 🔍 ¿Qué se puede exportar?

Puedes exportar tres tipos de elementos:

1. **Componentes**: Elementos visuales reutilizables
2. **Directivas**: Comportamientos adicionales para elementos DOM
3. **Pipes**: Transformadores de datos para templates

**Nota importante**: Solo puedes exportar elementos que:
- Estén declarados en el mismo módulo, O
- Sean importados de otro módulo

## 📋 Patrones comunes de exportación

### 1. Exportación de componentes, directivas y pipes propios

El caso más común es exportar elementos declarados en el propio módulo:

```typescript
@NgModule({
  declarations: [
    ButtonComponent,
    CardComponent
  ],
  exports: [
    ButtonComponent,
    CardComponent
  ]
})
export class UiComponentsModule { }
```

### 2. Re-exportación de módulos completos

Puedes re-exportar módulos que has importado, facilitando el acceso a sus elementos:

```typescript
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    // Re-exportamos estos módulos
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class SharedModule { }
```

### 3. Exportación selectiva de elementos importados

Puedes importar un módulo pero exportar solo algunos de sus elementos:

```typescript
@NgModule({
  imports: [
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule
  ],
  exports: [
    // Solo re-exportamos los componentes que usamos frecuentemente
    MatButtonModule,
    MatCardModule
  ]
})
export class MaterialComponentsModule { }
```

## 🛠️ Módulo compartido típico con exportaciones

Un patrón común es crear un módulo compartido que consolide y exporte elementos comunes:

```typescript
@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    // Componentes propios
    PageTitleComponent,
    LoadingSpinnerComponent,
    
    // Directivas propias
    HighlightDirective,
    
    // Pipes propios
    TruncatePipe,
    FormatDatePipe
  ],
  exports: [
    // Re-exportamos módulos comunes
    CommonModule,
    FormsModule,
    
    // Exportamos nuestros componentes
    PageTitleComponent,
    LoadingSpinnerComponent,
    
    // Exportamos nuestras directivas
    HighlightDirective,
    
    // Exportamos nuestros pipes
    TruncatePipe,
    FormatDatePipe
  ]
})
export class SharedModule { }
```

## 💡 Mejores prácticas para exportaciones

### 1. Exportación explícita

Solo exporta lo que realmente necesita ser compartido:

```typescript
// ❌ Evita exportar todo indiscriminadamente
exports: [ComponenteA, ComponenteB, ComponenteC, ComponenteD, ComponenteE]

// ✅ Exporta solo lo que otros módulos realmente necesitan
exports: [ComponenteA, ComponenteB]
```

### 2. Exportaciones lógicas y cohesivas

Agrupa exportaciones relacionadas en módulos con propósito claro:

```typescript
// ❌ Evita mezclar elementos no relacionados
@NgModule({
  exports: [UserComponent, ProductComponent, DatePipe, MatButton]
})

// ✅ Agrupa elementos relacionados
@NgModule({
  exports: [UserListComponent, UserDetailComponent, UserFormComponent]
})
```

### 3. Documentación de intención

Comenta tus exportaciones para clarificar su propósito:

```typescript
@NgModule({
  exports: [
    // Componentes de interfaz de usuario básicos
    ButtonComponent,
    CardComponent,
    
    // Componentes de formulario
    InputComponent,
    SelectComponent
  ]
})
```

## 📊 Estrategias de organización de exportaciones

### Módulo de API pública

Crea módulos que sirvan como "API pública" para áreas funcionales:

```typescript
@NgModule({
  imports: [CoreFeaturesModule],
  exports: [
    // Solo exportamos los componentes que forman la API pública
    // de esta característica, ocultando los detalles de implementación
    DashboardComponent,
    ReportViewerComponent
  ]
})
export class DashboardModule { }
```

### Módulos de barril (Index barrel)

Usa archivos `index.ts` para simplificar importaciones:

```typescript
// shared/index.ts
export * from './shared.module';
export * from './components/index';
export * from './directives/index';
export * from './pipes/index';
```

## ⚠️ Errores comunes en exportaciones

1. **Exportar lo que no se ha declarado ni importado**:
   ```typescript
   // ❌ Error: ComponenteExterno no está declarado ni importado
   @NgModule({
     declarations: [MiComponente],
     exports: [MiComponente, ComponenteExterno]
   })
   ```

2. **No exportar lo que otros módulos necesitan**:
   ```typescript
   // ❌ Error: SharedModule importa ComponenteA pero no lo declara ni lo exporta
   // Otros módulos que importen SharedModule no podrán usar ComponenteA
   ```

3. **Dependencias circulares por exportaciones incorrectas**:
   ```typescript
   // ❌ Error: Módulo A exporta componentes que dependen de Módulo B,
   // y Módulo B exporta componentes que dependen de Módulo A
   ```

