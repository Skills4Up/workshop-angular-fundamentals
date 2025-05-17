# Módulos Compartidos en Angular

Los módulos compartidos (shared modules) contienen componentes, directivas y pipes que se reutilizan en múltiples partes de la aplicación. Permiten compartir funcionalidades comunes sin duplicar código.

## 🧩 ¿Qué es un módulo compartido?

Un módulo compartido es un NgModule que agrupa y exporta elementos reutilizables como:

- Componentes UI comunes (botones, tarjetas, modales)
- Directivas personalizadas
- Pipes personalizados
- Módulos Angular comunes (FormsModule, ReactiveFormsModule)

## 🎯 Beneficios de los módulos compartidos

- **Reutilización**: Evita duplicar código y componentes
- **Consistencia**: Garantiza una apariencia y comportamiento uniformes
- **Mantenibilidad**: Centraliza cambios en componentes compartidos
- **Modularidad**: Simplifica la importación de múltiples componentes en un solo paso
- **Organización**: Separa claramente lo que es específico y lo que es común

## 📊 Estructura de un módulo compartido

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Componentes compartidos
import { ButtonComponent } from './components/button/button.component';
import { CardComponent } from './components/card/card.component';
import { ModalComponent } from './components/modal/modal.component';

// Directivas compartidas
import { HighlightDirective } from './directives/highlight.directive';

// Pipes compartidos
import { TruncatePipe } from './pipes/truncate.pipe';
import { FilenamePipe } from './pipes/filename.pipe';

@NgModule({
  declarations: [
    // Declaración de componentes, directivas y pipes
    ButtonComponent,
    CardComponent,
    ModalComponent,
    HighlightDirective,
    TruncatePipe,
    FilenamePipe
  ],
  imports: [
    // Módulos requeridos por los componentes compartidos
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    // Re-exportamos módulos Angular comunes
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    
    // Exportamos nuestros componentes, directivas y pipes
    ButtonComponent,
    CardComponent,
    ModalComponent,
    HighlightDirective,
    TruncatePipe,
    FilenamePipe
  ]
})
export class SharedModule { }
```

## 🚀 Implementación de un módulo compartido

### 1. Creación del módulo con CLI

```bash
ng generate module shared
```

### 2. Generación de componentes compartidos

```bash
ng generate component shared/components/button --export
ng generate component shared/components/card --export
ng generate component shared/components/modal --export
```

### 3. Generación de directivas y pipes

```bash
ng generate directive shared/directives/highlight --export
ng generate pipe shared/pipes/truncate --export
```

### 4. Configuración del módulo compartido

Asegúrate de exportar tanto los elementos declarados como los módulos que quieres compartir.

### 5. Uso del módulo compartido en otros módulos

```typescript
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { ProductListComponent } from './product-list.component';

@NgModule({
  declarations: [ProductListComponent],
  imports: [SharedModule]  // Importa el módulo compartido
})
export class ProductsModule { }
```

## 💡 Patrones comunes para módulos compartidos

### Módulo compartido básico

Exporta componentes, directivas y pipes comunes:

```typescript
@NgModule({
  declarations: [ButtonComponent, SpinnerComponent],
  exports: [ButtonComponent, SpinnerComponent]
})
export class UiComponentsModule { }
```

### Módulo centralizado de dependencias

Re-exporta módulos Angular comunes para simplificar las importaciones:

```typescript
@NgModule({
  imports: [CommonModule, FormsModule, RouterModule],
  exports: [CommonModule, FormsModule, RouterModule]
})
export class CommonDependenciesModule { }
```

### Módulo compartido configurable

Usa el patrón `.forRoot()` para configuración:

```typescript
@NgModule({...})
export class SharedModule {
  static forRoot(config?: SharedConfig): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        { provide: SHARED_CONFIG, useValue: config || defaultConfig }
      ]
    };
  }
}
```

## 📂 Estructura de carpetas recomendada

```
src/app/
  shared/                # Carpeta para elementos compartidos
    components/          # Componentes UI reutilizables
      button/
      card/
      modal/
    directives/          # Directivas personalizadas
    pipes/               # Pipes personalizados
    models/              # Interfaces y modelos compartidos
    utils/               # Funciones de utilidad
    shared.module.ts     # Módulo principal
```

## ⚠️ Consideraciones importantes

1. **No incluyas servicios singleton** en el módulo compartido, usa `@Injectable({ providedIn: 'root' })` en su lugar
2. **Evita la lógica específica de dominio** en los componentes compartidos
3. **No incluyas componentes específicos** de características en el módulo compartido
4. **No importes módulos de características** en el módulo compartido (evita dependencias circulares)

## 💡 Buenas prácticas

1. **Organiza por tipo**: Separa componentes, directivas y pipes en carpetas distintas
2. **Exporta explícitamente**: Solo exporta lo que realmente necesita ser compartido
3. **Mantén la cohesión**: Los componentes deben tener un propósito claro y específico
4. **Documenta componentes**: Proporciona documentación sobre el uso de los componentes compartidos
5. **Minimiza dependencias**: Cada componente compartido debe tener el mínimo de dependencias
6. **Pruebas unitarias**: Asegúrate de que los componentes compartidos tienen buena cobertura de tests

