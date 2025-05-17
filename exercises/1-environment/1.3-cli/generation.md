# Generación de Elementos con Angular CLI

El comando `ng generate` (o `ng g`) es una de las características más potentes del Angular CLI, permitiéndote generar diferentes tipos de elementos siguiendo las mejores prácticas de Angular.

## 📝 Sintaxis básica

```
ng generate <schematic> <name> [options]
```

o usando el alias:

```
ng g <schematic> <name> [options]
```

## 🧱 Elementos generables (Schematics)

| Elemento | Comando | Alias | Descripción |
|----------|---------|-------|-------------|
| Component | `ng g component my-component` | `ng g c` | Genera un componente completo |
| Module | `ng g module my-module` | `ng g m` | Genera un módulo Angular |
| Service | `ng g service my-service` | `ng g s` | Genera un servicio |
| Directive | `ng g directive my-directive` | `ng g d` | Genera una directiva |
| Pipe | `ng g pipe my-pipe` | `ng g p` | Genera un pipe |
| Class | `ng g class my-class` | `ng g cl` | Genera una clase |
| Interface | `ng g interface my-interface` | `ng g i` | Genera una interfaz |
| Enum | `ng g enum my-enum` | `ng g e` | Genera un enum |
| Guard | `ng g guard my-guard` | `ng g g` | Genera un guard |
| Resolver | `ng g resolver my-resolver` | `ng g r` | Genera un resolver |
| Application | `ng g application my-app` | `ng g app` | Genera una aplicación en un workspace |
| Library | `ng g library my-lib` | `ng g lib` | Genera una biblioteca |

## 🎛️ Opciones comunes

| Opción | Descripción | Ejemplo |
|--------|-------------|---------|
| `--flat` | No genera carpeta | `ng g c my-comp --flat` |
| `--inline-template` | Usa template inline | `ng g c my-comp --inline-template` |
| `--inline-style` | Usa estilos inline | `ng g c my-comp --inline-style` |
| `--prefix` | Especifica prefijo del selector | `ng g c my-comp --prefix=app` |
| `--skip-tests` | No genera archivo de pruebas | `ng g c my-comp --skip-tests` |
| `--export` | Exporta en el módulo declarador | `ng g c my-comp --export` |
| `--module` | Especifica módulo donde declarar | `ng g c my-comp --module=app` |
| `--route` | Especifica ruta para lazy-loading | `ng g m my-mod --route=my-route` |
| `--routing` | Incluye archivo de routing | `ng g m my-mod --routing` |

## 📁 Rutas para la generación

Puedes especificar rutas relativas:

```
ng g component pages/user/profile
```

Esto generará el componente en `src/app/pages/user/profile/`.

## 🧩 Ejemplo de generación de componente

```bash
ng generate component shared/ui/button --export
```

Este comando:
1. Crea la carpeta `src/app/shared/ui/button/` (si no existe)
2. Genera los archivos del componente:
   - `button.component.ts`
   - `button.component.html`
   - `button.component.css`
   - `button.component.spec.ts`
3. Exporta el componente en el módulo donde se declara

## 🧩 Ejemplo de generación de módulo de características

```bash
ng generate module features/user --routing --route=user
```

Este comando:
1. Crea un módulo con su propio archivo de routing
2. Configura una ruta lazy-loaded en el router principal
3. Genera un componente principal para la ruta

## 🧪 Generación de elementos para testing

```bash
ng generate service data/api --flat
```

## 💡 Consejos avanzados

1. Usa `--dry-run` para previsualizar los archivos generados sin crearlos
2. Combina opciones como `--inline-style --inline-template` para componentes pequeños
3. Usa el flag `--project` para especificar el proyecto en workspaces multi-proyecto
4. Personaliza los esquemas de generación en `angular.json` para configuraciones por defecto
5. Crea tus propios schematics para estandarizar la generación de código en tu equipo

