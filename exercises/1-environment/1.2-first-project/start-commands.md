# Comandos para Ejecutar una Aplicación Angular

En este documento aprenderás los comandos básicos para ejecutar, construir y probar tu aplicación Angular utilizando Angular CLI.

## Ejecutar la aplicación en modo de desarrollo

Para iniciar el servidor de desarrollo con recarga automática:

```bash
ng serve
```

Por defecto, esto inicia la aplicación en `http://localhost:4200/`.

### Opciones comunes para ng serve

| Opción | Descripción |
|--------|-------------|
| `--open` (o `-o`) | Abre automáticamente la aplicación en el navegador |
| `--port=XXXX` | Cambia el puerto (por defecto es 4200) |
| `--host=0.0.0.0` | Para servir la aplicación en todas las interfaces de red |
| `--watch=false` | Desactiva la recarga automática |
| `--configuration=production` | Usa la configuración de producción |

Ejemplo de uso común:

```bash
ng serve --open
```

Este comando ejecuta la aplicación y la abre automáticamente en tu navegador predeterminado.

## Compilar la aplicación para producción

Para crear una versión de producción optimizada:

```bash
ng build
```

Para crear específicamente una versión de producción (con optimizaciones):

```bash
ng build --configuration=production
```

Estos comandos generan los archivos en el directorio `dist/` que se pueden desplegar en cualquier servidor web.

### Opciones útiles para ng build

| Opción | Descripción |
|--------|-------------|
| `--output-path=<directorio>` | Cambia el directorio de salida |
| `--base-href=<url>` | Establece el base href en el index.html |
| `--stats-json` | Genera un archivo stats.json para análisis |
| `--aot` | Usa compilación Ahead-of-Time (ya es el valor por defecto) |

## Ejecutar pruebas unitarias

Para ejecutar las pruebas unitarias:

```bash
ng test
```

Este comando ejecuta las pruebas unitarias usando Karma y Jasmine.

## Ejecutar análisis de código (linting)

Para ejecutar el linting de tu código:

```bash
ng lint
```

## Generar documentación

Para generar documentación de tu proyecto (requiere la instalación de Compodoc):

```bash
# Primero instala Compodoc
npm install -g @compodoc/compodoc

# Luego genera la documentación
compodoc -p tsconfig.json
```

## Verificar el estado del proyecto

Para obtener información sobre la versión de Angular y otras dependencias:

```bash
ng version
```

## Ejecutar la aplicación con diferentes configuraciones

Angular permite definir diferentes configuraciones en `angular.json`. Para usar una configuración específica:

```bash
ng serve --configuration=staging
```

## Flujo de trabajo típico

Un flujo de trabajo típico durante el desarrollo incluye:

1. **Iniciar el servidor de desarrollo:**
   ```bash
   ng serve --open
   ```

2. **Realizar cambios en el código** y ver cómo se actualizan automáticamente en el navegador.

3. **Ejecutar pruebas unitarias** para asegurarse de que todo funciona correctamente:
   ```bash
   ng test
   ```

4. **Construir para producción** cuando estés listo para desplegar:
   ```bash
   ng build --configuration=production
   ```

## Ejercicio práctico

1. Navega al directorio de tu proyecto Angular:
   ```bash
   cd mi-primera-angular-app
   ```

2. Inicia el servidor de desarrollo con apertura automática del navegador:
   ```bash
   ng serve --open
   ```

3. Observa la aplicación ejecutándose en tu navegador. Deberías ver la página de bienvenida de Angular.

4. Modifica el archivo `src/app/app.component.ts` cambiando el valor de la propiedad `title` y observa cómo la página se actualiza automáticamente.

5. Detén el servidor usando `Ctrl+C` en la terminal.

## Solución de problemas comunes

| Problema | Solución |
|----------|----------|
| Puerto en uso | Usa `ng serve --port=4201` para cambiar el puerto |
| Error de memoria | Aumenta el límite de memoria con `NODE_OPTIONS=--max_old_space_size=4096 ng serve` |
| Error "Cannot find module" | Ejecuta `npm install` para reinstalar dependencias |

## Siguientes pasos

Si encuentras problemas durante la ejecución de tu aplicación, consulta HINTS.md para soluciones a problemas comunes.

