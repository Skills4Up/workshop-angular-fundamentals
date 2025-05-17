# Generación de Módulos con Angular CLI

El Angular CLI proporciona comandos poderosos para generar módulos y estructuras relacionadas, ahorrando tiempo y asegurando que se sigan las mejores prácticas.

## 🛠️ Comando básico para generar módulos

```bash
ng generate module nombre-del-modulo
# o usando el alias
ng g m nombre-del-modulo
```

Este comando crea un archivo `nombre-del-modulo.module.ts` con la estructura básica de un NgModule.

## 🔍 Opciones principales para generación de módulos

| Opción | Alias | Descripción | Ejemplo |
|--------|-------|-------------|---------|
| `--routing` | `-r` | Genera un módulo de routing | `ng g m admin --routing` |
| `--route` | | Configura una ruta lazy loaded | `ng g m admin --route=admin` |
| `--module` | `-m` | Especifica en qué módulo importar | `ng g m shared -m=app` |
| `--flat` | | No crea carpeta para el módulo | `ng g m utils --flat` |
| `--project` | `-p` | Especifica el proyecto en un workspace | `ng g m shared -p=admin-app` |
| `--dry-run` | `-d` | Simula sin crear archivos | `ng g m admin -d` |

## 📋 Ejemplos prácticos de generación

### 1. Módulo básico

```bash
ng generate module features/products
```

Resultado:
```
CREATE src/app/features/products/products.module.ts (193 bytes)
```

Contenido generado:
```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ProductsModule { }
```

### 2. Módulo con routing

```bash
ng generate module features/users --routing
```

Resultado:
```
CREATE src/app/features/users/users-routing.module.ts (248 bytes)
CREATE src/app/features/users/users.module.ts (284 bytes)
```

### 3. Módulo con lazy loading

```bash
ng generate module features/orders --route=orders --module=app-routing
```

Resultado:
```
CREATE src/app/features/orders/orders-routing.module.ts (359 bytes)
CREATE src/app/features/orders/orders.module.ts (390 bytes)
CREATE src/app/features/orders/orders.component.html (21 bytes)
CREATE src/app/features/orders/orders.component.spec.ts (628 bytes)
CREATE src/app/features/orders/orders.component.ts (281 bytes)
CREATE src/app/features/orders/orders.component.css (0 bytes)
UPDATE src/app/app-routing.module.ts (xxx bytes)
```

Este comando:
1. Crea un módulo `OrdersModule` con su routing
2. Genera un componente `OrdersComponent`
3. Actualiza `app-routing.module.ts` para incluir la ruta lazy loaded

### 4. Estructura modular completa

Para crear una estructura modular completa puedes encadenar comandos:

```bash
# Crear el módulo de características
ng g m features/customers --routing

# Añadir componentes al módulo
ng g c features/customers/customer-list --module=features/customers
ng g c features/customers/customer-detail --module=features/customers
ng g c features/customers/customer-form --module=features/customers

# Añadir servicios
ng g s features/customers/services/customer
```

## 🔄 Integrando con estructuras existentes

### Importar un módulo en otro módulo

```bash
ng generate module shared --module=app
```

Esto genera un módulo `SharedModule` y lo importa automáticamente en `AppModule`.

### Añadir componentes a un módulo específico

```bash
ng generate component shared/components/button --module=shared --export
```

Esto genera un componente `ButtonComponent`:
1. Lo declara en el `SharedModule`
2. Lo exporta automáticamente en el mismo módulo

## 🧪 Plantillas personalizadas

Puedes crear plantillas personalizadas para los módulos con schematics:

```bash
ng generate @angular/material:material-module shared/material
```

Este comando utiliza un schematic personalizado para generar un módulo que agrupa componentes de Angular Material.

## 🔍 Visualización previa con --dry-run

Siempre puedes usar `--dry-run` (o `-d`) para ver qué archivos se generarán sin crearlos realmente:

```bash
ng generate module core --routing --dry-run
```

Resultado:
```
CREATE src/app/core/core-routing.module.ts (248 bytes)
CREATE src/app/core/core.module.ts (284 bytes)
NOTE: The "dryRun" flag means no changes were made.
```

## 💡 Consejos para la generación de módulos

1. **Usa siempre el CLI** para la generación de módulos para mantener la consistencia
2. **Organiza en carpetas** por dominio o funcionalidad (`features/`, `shared/`, `core/`)
3. **Usa `--routing`** para módulos que necesitarán sus propias rutas
4. **Usa `--route` y `--module`** para configurar lazy loading automáticamente
5. **Considera `--flat`** para módulos pequeños o utilitarios
6. **Usa `--dry-run`** para verificar la estructura antes de generar

## 📂 Estructura de directorio recomendada

```
src/app/
  app.module.ts                  # Módulo raíz
  app-routing.module.ts          # Routing principal
  core/                          # Módulo para servicios singleton
    core.module.ts
    services/
    guards/
  shared/                        # Módulo para elementos compartidos
    shared.module.ts
    components/
    directives/
    pipes/
  features/                      # Módulos por características
    products/
      products.module.ts
      products-routing.module.ts
      components/
      services/
    orders/
      orders.module.ts
      orders-routing.module.ts
      components/
      services/
```

