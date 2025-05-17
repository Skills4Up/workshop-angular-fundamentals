# Solución a Problemas Comunes

Esta guía te ayudará a resolver problemas comunes que podrías encontrar durante la configuración de tu entorno de desarrollo Angular.

## Problemas con Node.js y npm

### Versión incorrecta de Node.js

**Problema**: Angular requiere una versión específica de Node.js para funcionar correctamente.

**Solución**: Usa nvm (Node Version Manager) para instalar y gestionar múltiples versiones de Node.js:

```bash
# Para Windows (nvm-windows)
# Descarga e instala desde: https://github.com/coreybutler/nvm-windows/releases

# Para macOS/Linux
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
# O con wget
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash

# Luego instala la versión necesaria
nvm install 22.15.1
nvm use 22.15.1
```

### Errores de permisos con npm

**Problema**: No puedes instalar paquetes globales debido a errores de permisos.

**Solución**:

```bash
# Opción 1: Cambiar propietario del directorio de npm
sudo chown -R $(whoami) $(npm config get prefix)/{lib/node_modules,bin,share}

# Opción 2: Configurar npm para usar un directorio en tu perfil de usuario
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
# Añade esto a tu .bashrc o .zshrc
export PATH=~/.npm-global/bin:$PATH
```

## Problemas con Angular CLI

### Comando 'ng' no encontrado

**Problema**: Después de instalar Angular CLI, el comando `ng` no es reconocido.

**Solución**:

1. Verifica que la instalación fue exitosa: `npm list -g --depth=0`
2. Asegúrate de que el directorio de instalación está en tu PATH
3. Intenta reinstalar: `npm install -g @angular/cli`

### Versiones en conflicto

**Problema**: Tienes una versión global y otra local del CLI que entran en conflicto.

**Solución**:

```bash
# Desinstala ambas versiones
npm uninstall -g @angular/cli
npm uninstall @angular/cli

# Limpia la caché
npm cache clean --force

# Reinstala la versión deseada
npm install -g @angular/cli@versión
```

## Problemas con VS Code

### Las extensiones no funcionan correctamente

**Problema**: Las extensiones instaladas no ofrecen la funcionalidad esperada.

**Solución**:

1. Verifica que las extensiones están habilitadas
2. Reinicia VS Code: `Ctrl+Shift+P` -> "Developer: Reload Window"
3. Actualiza las extensiones: `Ctrl+Shift+P` -> "Extensions: Update All Extensions"

### Intellisense no funciona para Angular

**Problema**: No tienes autocompletado o información de tipos para código Angular.

**Solución**:

1. Asegúrate de que Angular Language Service está instalado
2. Verifica que estás usando la versión del compilador de TypeScript del workspace: `Ctrl+Shift+P` -> "TypeScript: Select TypeScript Version" -> "Use Workspace Version"
3. Regenera los archivos de configuración de TypeScript:
```bash
ng config -g cli.warnings.typescriptMismatch false
```

## Problemas específicos del sistema operativo

### Windows

**Problema**: Errores al ejecutar scripts en PowerShell.

**Solución**:

```powershell
# Ejecuta PowerShell como administrador y usa:
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

**Problema**: Problemas con rutas de archivo largas.

**Solución**: Habilita soporte para rutas largas (en Windows 10 1607 o posterior):

```powershell
# Ejecuta como administrador
New-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem" -Name "LongPathsEnabled" -Value 1 -PropertyType DWORD -Force
```

### macOS

**Problema**: Permisos denegados al instalar paquetes.

**Solución**:

```bash
sudo chown -R $USER /usr/local/lib/node_modules
```

**Problema**: Herramientas de línea de comandos no disponibles.

**Solución**:

```bash
xcode-select --install
```

### Linux

**Problema**: Versiones desactualizadas en los repositorios.

**Solución**: Usa NodeSource para obtener versiones más recientes:

```bash
# Para Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Para RHEL/CentOS/Fedora
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
```

## Comprobación del entorno

Para verificar que tu entorno está correctamente configurado, ejecuta:

```bash
ng --version
```

Deberías ver la versión de Angular CLI, Node.js, y otras dependencias relevantes. Si todo está correcto, tu entorno está listo para el desarrollo con Angular.

## Recursos adicionales

- [Documentación oficial de Angular](https://angular.io/docs)
- [Node.js Troubleshooting Guide](https://nodejs.org/en/docs/guides/troubleshooting/)
- [VS Code Docs](https://code.visualstudio.com/docs)
- [Angular CLI Wiki](https://github.com/angular/angular-cli/wiki)
