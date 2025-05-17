# Tips para el Angular CLI

Esta guía contiene soluciones a problemas comunes y consejos útiles para trabajar con el Angular CLI.

## 🔍 Solución a problemas frecuentes

### El comando `ng` no es reconocido

**Problema:** Terminal no reconoce el comando `ng`.

**Soluciones:**
1. Verifica que Angular CLI está instalado globalmente:
   ```bash
   npm list -g @angular/cli
   ```

2. Si no está instalado, instálalo:
   ```bash
   npm install -g @angular/cli
   ```

3. Si está instalado pero sigue sin funcionar, puede ser un problema de PATH:
   - En Windows: Reinicia la terminal o el sistema
   - En macOS/Linux: Asegúrate que la ruta de npm global está en tu PATH

4. Alternativa: Usa npx para ejecutar el CLI localmente:
   ```bash
   npx ng <comando>
   ```

### Errores durante la generación de código

**Problema:** Aparecen errores al generar componentes o módulos.

**Soluciones:**
1. Verifica que estás dentro de un proyecto Angular válido
2. Comprueba que tienes permisos de escritura en la carpeta
3. Usa rutas relativas desde la carpeta donde estás ejecutando el comando
4. Usa el flag `--dry-run` para verificar lo que se va a generar sin crear archivos

### Conflictos con archivos existentes

**Problema:** Al generar nuevos elementos, hay conflictos con archivos existentes.

**Soluciones:**
1. Usa `--force` para sobrescribir archivos (con precaución)
2. Cambia el nombre del elemento a generar
3. Mueve o elimina los archivos conflictivos primero

## 💡 Consejos de productividad

### Alias para comandos frecuentes

Crea alias en tu terminal para los comandos que uses con frecuencia:

**macOS/Linux** (añade esto a tu .bashrc o .zshrc):
```bash
alias ng-serve='ng serve --open'
alias ng-comp='ng generate component'
alias ng-mod='ng generate module'
alias ng-svc='ng generate service'
```

**Windows** (PowerShell, añade a tu perfil):
```powershell
function ng-serve { ng serve --open }
function ng-comp { ng generate component $args }
function ng-mod { ng generate module $args }
function ng-svc { ng generate service $args }
```

### Explotar el uso de opciones combinadas

Combina múltiples opciones para generar exactamente lo que necesitas:

```bash
ng g c my-component --inline-style --inline-template --skip-tests --prefix=app
```

### Personalización del CLI

Personaliza la configuración del CLI en `angular.json`:

1. Modifica los valores predeterminados para generación de componentes:
   ```json
   "schematics": {
     "@schematics/angular:component": {
       "skipTests": true,
       "inlineStyle": true,
       "inlineTemplate": false,
       "prefix": "app"
     }
   }
   ```

2. Con esta configuración, cada vez que generes un componente usará esos valores predeterminados.

### Schematics de terceros

Utiliza schematics de bibliotecas populares para generar código específico:

```bash
ng add @angular/material
ng generate @angular/material:navigation nav
ng generate @angular/material:dashboard dashboard
```

## 🔧 Consejos para configuración avanzada

### Workspaces multi-proyecto

Trabaja con múltiples proyectos en el mismo workspace:

```bash
# Generar una biblioteca compartida
ng generate library shared-ui

# Generar componentes en la biblioteca
ng generate component button --project=shared-ui

# Generar una nueva aplicación en el workspace
ng generate application admin-panel
```

### Configuraciones personalizadas de compilación

Crea configuraciones adicionales en `angular.json`:

```json
"configurations": {
  "staging": {
    "fileReplacements": [
      {
        "replace": "src/environments/environment.ts",
        "with": "src/environments/environment.staging.ts"
      }
    ],
    "optimization": true,
    "outputHashing": "all"
  }
}
```

Luego usa:
```bash
ng build --configuration=staging
```

## 📊 Análisis y optimización

### Análisis del tamaño del bundle

```bash
ng build --stats-json
npx webpack-bundle-analyzer dist/[project-name]/stats.json
```

### Depuración de dependencias circulares

```bash
ng build --circular-dependency-error
```

## 🚀 Consejos avanzados para el CLI

1. **Usa namespaces**: Organiza tus componentes en carpetas por funcionalidad
2. **Prefijos**: Usa prefijos específicos para diferentes áreas de la aplicación
3. **Automatización**: Crea scripts NPM que combinen múltiples comandos del CLI
4. **Control de versiones**: Incluye un archivo `.nvmrc` para asegurar que todos usen la misma versión de Node
5. **Documentación**: Mantén una lista de comandos personalizados en el README del proyecto


Similar code found with 2 license types
