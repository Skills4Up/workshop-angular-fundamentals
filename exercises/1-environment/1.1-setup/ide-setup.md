# Configuración del IDE (VS Code)

Visual Studio Code (VS Code) es uno de los IDEs más populares para el desarrollo con Angular debido a su ligereza, extensibilidad y excelente soporte para TypeScript. Este documento te guiará en la configuración de VS Code para el desarrollo óptimo con Angular.

## Instalación de Visual Studio Code

1. Visita [https://code.visualstudio.com/](https://code.visualstudio.com/) y descarga la versión para tu sistema operativo
2. Instala VS Code siguiendo las instrucciones del asistente
3. Abre VS Code después de la instalación

## Extensiones recomendadas para Angular

VS Code mejora significativamente con extensiones. A continuación, te presentamos las esenciales para el desarrollo con Angular:

### Extensiones imprescindibles

1. **Angular Language Service**
   - ID: `angular.ng-template`
   - Proporciona completado de código, diagnósticos, navegación y más para plantillas Angular

2. **TypeScript Importer**
   - ID: `pmneo.tsimporter`
   - Añade automáticamente declaraciones de importación para componentes, directivas, etc.

3. **ESLint**
   - ID: `dbaeumer.vscode-eslint`
   - Integra ESLint en VS Code para linting de código

4. **Prettier - Code formatter**
   - ID: `esbenp.prettier-vscode`
   - Formatea automáticamente tu código para mantener un estilo consistente

### Extensiones útiles adicionales

5. **Angular Snippets**
   - ID: `johnpapa.angular2`
   - Proporciona snippets para crear rápidamente componentes, servicios, etc.

6. **Angular Console**
   - ID: `nrwl.angular-console`
   - GUI para Angular CLI, facilita la ejecución de comandos comunes

7. **Material Icon Theme**
   - ID: `pkief.material-icon-theme`
   - Iconos para archivos Angular y TypeScript

## Instalación de extensiones

Hay dos maneras de instalar estas extensiones:

### Método 1: Desde VS Code

1. Abre VS Code
2. Haz clic en el icono de extensiones en la barra lateral izquierda (o presiona `Ctrl+Shift+X`)
3. Busca la extensión por nombre o ID
4. Haz clic en "Install"

### Método 2: Desde la línea de comandos

Puedes instalar extensiones usando el CLI de VS Code:

```bash
# Instalar todas las extensiones imprescindibles
code --install-extension angular.ng-template
code --install-extension pmneo.tsimporter
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
```

## Configuración recomendada

Para optimizar VS Code para el desarrollo con Angular, puedes añadir estas configuraciones:

1. Abre VS Code
2. Presiona `Ctrl+Shift+P` (o `Cmd+Shift+P` en macOS)
3. Escribe "Preferences: Open Settings (JSON)" y selecciónalo
4. Añade estas configuraciones:

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "typescript.preferences.importModuleSpecifier": "relative",
  "angular.view-engine": false,
  "typescript.tsdk": "node_modules/typescript/lib",
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

## Atajos de teclado útiles

Estos atajos de teclado pueden aumentar tu productividad cuando trabajas con Angular:

| Atajo | Acción |
|-------|--------|
| `Ctrl+Space` | Activar sugerencias de código |
| `F12` | Ir a definición |
| `Alt+F12` | Peek definición |
| `Shift+F12` | Mostrar referencias |
| `Ctrl+P` | Buscar archivos por nombre |
| `Ctrl+Shift+F` | Buscar en todos los archivos |
| `Ctrl+.` | Mostrar acciones rápidas (fixes) |
| `Ctrl+K Ctrl+S` | Ver todos los atajos de teclado |

## Siguientes pasos

Ahora que has configurado VS Code para el desarrollo con Angular, consulta [HINTS.md](HINTS.md) para soluciones a problemas comunes que podrías encontrar durante la configuración.
