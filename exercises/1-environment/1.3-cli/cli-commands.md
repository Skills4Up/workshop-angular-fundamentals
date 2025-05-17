# Comandos Principales del Angular CLI

Esta guía cubre los comandos más utilizados del Angular CLI que necesitarás para el desarrollo diario de aplicaciones Angular.

## 💻 Comandos básicos

| Comando | Descripción | Ejemplo |
|---------|-------------|---------|
| `ng new` | Crea un nuevo proyecto Angular | `ng new my-app` |
| `ng serve` | Inicia el servidor de desarrollo | `ng serve --open` |
| `ng build` | Compila la aplicación | `ng build --prod` |
| `ng test` | Ejecuta las pruebas unitarias | `ng test` |
| `ng e2e` | Ejecuta las pruebas end-to-end | `ng e2e` |
| `ng generate` | Genera código (alias: `ng g`) | `ng g component my-comp` |
| `ng add` | Añade soporte para paquetes externos | `ng add @angular/material` |
| `ng update` | Actualiza la aplicación y dependencias | `ng update @angular/core` |
| `ng help` | Muestra ayuda para comandos | `ng help generate` |

## 🔍 Opciones comunes

Muchos comandos aceptan estas opciones:

| Opción | Descripción | Ejemplo |
|--------|-------------|---------|
| `--help` | Muestra ayuda para un comando | `ng serve --help` |
| `--dry-run` | Simula la ejecución sin modificar archivos | `ng g component test --dry-run` |
| `--skip-tests` | Omite la generación de archivos de prueba | `ng g component test --skip-tests` |
| `--verbose` | Muestra información detallada | `ng build --verbose` |
| `--defaults` | Usa valores por defecto sin preguntar | `ng new my-app --defaults` |

## 🌐 Servidor de desarrollo (ng serve)

| Opción | Descripción | Valor predeterminado |
|--------|-------------|----------------------|
| `--open` (o `-o`) | Abre el navegador automáticamente | `false` |
| `--port` (o `-p`) | Puerto para el servidor | `4200` |
| `--host` | Host para el servidor | `localhost` |
| `--ssl` | Usa HTTPS | `false` |
| `--watch` | Reconstruye cuando los archivos cambian | `true` |

Ejemplo: `ng serve --open --port=8080`

## 🏗️ Construcción (ng build)

| Opción | Descripción | Valor predeterminado |
|--------|-------------|----------------------|
| `--configuration` (o `-c`) | Configuración a usar | `development` |
| `--prod` | Atajo para la configuración de producción | - |
| `--aot` | Usa compilación Ahead of Time | `true` |
| `--source-map` | Genera source maps | `true` en desarrollo |
| `--stats-json` | Genera estadísticas de compilación | `false` |

Ejemplo: `ng build --configuration=production`

## 🧪 Pruebas (ng test)

| Opción | Descripción | Valor predeterminado |
|--------|-------------|----------------------|
| `--watch` | Ejecuta pruebas cuando cambian los archivos | `true` |
| `--browsers` | Navegadores para ejecutar las pruebas | `Chrome` |
| `--code-coverage` | Genera informe de cobertura | `false` |

Ejemplo: `ng test --no-watch --code-coverage`

## 📂 Configuración Angular

La mayoría de la configuración del CLI se almacena en:

- **angular.json**: Configuración principal del workspace y proyectos
- **tsconfig.json**: Configuración de TypeScript
- **package.json**: Dependencias y scripts npm

## 🌟 Consejos pro

1. Usa `--dry-run` (o `-d`) para ver qué archivos se crearán antes de ejecutar un comando
2. Usa el autocompletado instalando `@angular/cli` globalmente
3. Agrega alias en tu shell para comandos frecuentes
4. Personaliza los esquemas de generación para adaptarlos a tus estándares de código
5. Explora el archivo `angular.json` para configurar opciones avanzadas

