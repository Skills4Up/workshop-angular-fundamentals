# Generación de Componentes con Angular CLI

El Angular CLI proporciona comandos potentes para generar componentes de forma rápida y consistente, siguiendo las mejores prácticas recomendadas.

## 🛠️ Comando básico para generar componentes

```bash
ng generate component nombre-del-componente
# o usando el alias
ng g c nombre-del-componente
```

Este comando crea:
1. Un directorio con el nombre del componente
2. Cuatro archivos para el componente (TypeScript, HTML, CSS, spec)
3. Actualiza automáticamente el módulo para incluir el componente

## 📂 Estructura de archivos generada

Para un componente llamado "user-profile", el CLI creará:

```
src/app/user-profile/
  ├── user-profile.component.ts      # Clase del componente
  ├── user-profile.component.html    # Template
  ├── user-profile.component.css     # Estilos
  └── user-profile.component.spec.ts # Tests unitarios
```

## 🎛️ Opciones más utilizadas del CLI

| Opción | Alias | Descripción | Ejemplo |
|--------|-------|-------------|---------|
| `--flat` | | No crea una carpeta para el componente | `ng g c header --flat` |
| `--inline-template` | `-t` | Template en línea en el archivo TS | `ng g c footer -t` |
| `--inline-style` | `-s` | Estilos en línea en el archivo TS | `ng g c footer -s` |
| `--skip-tests` | | No genera archivo de pruebas | `ng g c sidebar --skip-tests` |
| `--export` | | Exporta el componente desde el módulo | `ng g c shared/button --export` |
| `--module` | `-m` | Especifica el módulo al que pertenece | `ng g c user-card -m=features/user` |
| `--prefix` | `-p` | Cambia el prefijo del selector | `ng g c icon -p=app` |
| `--style` | | Especifica el formato de estilo | `ng g c card --style=scss` |
| `--change-detection` | | Establece estrategia de detección | `ng g c data-table --change-detection=OnPush` |
| `--dry-run` | `-d` | Muestra lo que haría sin realizar cambios | `ng g c user-avatar -d` |

## 📋 Ejemplos prácticos de generación

### 1. Componente básico

```bash
ng generate component features/dashboard
```

Resultado:
```
CREATE src/app/features/dashboard/dashboard.component.html (23 bytes)
CREATE src/app/features/dashboard/dashboard.component.spec.ts (614 bytes)
CREATE src/app/features/dashboard/dashboard.component.ts (273 bytes)
CREATE src/app/features/dashboard/dashboard.component.css (0 bytes)
UPDATE src/app/app.module.ts (xxx bytes)
```

### 2. Componente con plantilla y estilos en línea

```bash
ng generate component header --inline-template --inline-style
# o usando los alias
ng g c header -t -s
```

Resultado:
```
CREATE src/app/header/header.component.spec.ts (564 bytes)
CREATE src/app/header/header.component.ts (283 bytes)
UPDATE src/app/app.module.ts (xxx bytes)
```

Contenido del archivo TS generado:
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <p>
      header works!
    </p>
  `,
  styles: [
  ]
})
export class HeaderComponent {
}
```

### 3. Componente sin pruebas y sin carpeta

```bash
ng generate component footer --skip-tests --flat
```

Resultado:
```
CREATE src/app/footer.component.html (21 bytes)
CREATE src/app/footer.component.ts (270 bytes)
CREATE src/app/footer.component.css (0 bytes)
UPDATE src/app/app.module.ts (xxx bytes)
```

### 4. Componente para un módulo específico con SCSS

```bash
ng generate component features/users/user-card --module=features/users --style=scss
```

Resultado:
```
CREATE src/app/features/users/user-card/user-card.component.scss (0 bytes)
CREATE src/app/features/users/user-card/user-card.component.html (24 bytes)
CREATE src/app/features/users/user-card/user-card.component.spec.ts (594 bytes)
CREATE src/app/features/users/user-card/user-card.component.ts (283 bytes)
UPDATE src/app/features/users/users.module.ts (xxx bytes)
```

### 5. Componente con OnPush

```bash
ng generate component data-table --change-detection=OnPush
```

Resultado:
```
CREATE src/app/data-table/data-table.component.html (25 bytes)
CREATE src/app/data-table/data-table.component.spec.ts (599 bytes)
CREATE src/app/data-table/data-table.component.ts (318 bytes)
CREATE src/app/data-table/data-table.component.css (0 bytes)
UPDATE src/app/app.module.ts (xxx bytes)
```

Contenido del archivo TS generado:
```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableComponent {
}
```

## 🧩 Generando componentes en una estructura existente

Para organizaciones complejas, puedes definir la ruta donde debe generarse el componente:

```bash
# Componente dentro de un módulo feature
ng g c modules/admin/components/user-management

# Componente compartido
ng g c shared/components/button --export

# Componente raíz para una página
ng g c pages/home --flat
```

## 📝 Generación con múltiples archivos de estilo

```bash
ng g c theme-switcher --style=scss --styleext=theme.scss
```

**Nota**: La opción `--styleext` es menos común, pero puede ser útil en casos específicos.

## 💡 Visualización previa con --dry-run

Siempre puedes usar `--dry-run` (o `-d`) para ver qué archivos se generarán sin crearlos realmente:

```bash
ng generate component complex-form --dry-run
```

Resultado:
```
CREATE src/app/complex-form/complex-form.component.html (27 bytes)
CREATE src/app/complex-form/complex-form.component.spec.ts (619 bytes)
CREATE src/app/complex-form/complex-form.component.ts (288 bytes)
CREATE src/app/complex-form/complex-form.component.css (0 bytes)
UPDATE src/app/app.module.ts (xxx bytes)
NOTE: The "dryRun" flag means no changes were made.
```

## 🧠 Consejos para la generación eficiente

1. **Usa siempre el CLI** para mantener la consistencia en tu proyecto
2. **Organiza en carpetas por funcionalidad** (features/, shared/, core/)
3. **Utiliza `--dry-run`** para verificar antes de generar
4. **Establece convenciones** para tu equipo sobre generación y estructura
5. **Considera `--export`** para componentes en módulos compartidos
6. **Usa `--change-detection=OnPush`** para componentes de solo presentación

## 🔍 Verificación de un componente generado

Después de generar un componente, puedes ver su contenido:

```typescript
// user-profile.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  // La lógica del componente irá aquí
}
```

```html
<!-- user-profile.component.html -->
<p>user-profile works!</p>
```

Y automáticamente aparecerá en la declaración del módulo:

```typescript
// app.module.ts o el módulo especificado
@NgModule({
  declarations: [
    // ...
    UserProfileComponent
  ],
  // ...
})
```

