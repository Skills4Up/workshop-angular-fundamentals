# Instalación de Angular CLI

El Angular CLI (Command Line Interface) es una herramienta de línea de comandos que facilita la creación, desarrollo, prueba y despliegue de aplicaciones Angular. Esta herramienta es esencial para el desarrollo eficiente con Angular.

## Requisitos previos

Antes de instalar Angular CLI, asegúrate de:

- Tener Node.js y npm instalados (ver [node-npm.md](node-npm.md))
- Tener acceso a una terminal o línea de comandos
- Tener permisos para instalar paquetes globales con npm

## Instalación global

El método recomendado es instalar Angular CLI globalmente para que esté disponible en todo el sistema:

```bash
npm install -g @angular/cli@18.2.19
```

Este comando descargará e instalará la última versión estable de Angular CLI.

## Verificación de la instalación

Para confirmar que Angular CLI se ha instalado correctamente, ejecuta:

```bash
ng version
```

Deberías ver una salida similar a esta:

```
Angular CLI: 18.2.19
Node: 22.15.1
Package Manager: npm 10.9.2
OS: darwin x64
```

## Actualización de Angular CLI

Si ya tienes instalado Angular CLI y necesitas actualizarlo a la última versión:

```bash
# Desinstalar la versión existente
npm uninstall -g @angular/cli

# Limpiar la caché de npm (opcional, pero recomendado)
npm cache clean --force

# Instalar la nueva versión
npm install -g @angular/cli
```

## Configuración de autocompletado (opcional)

Para habilitar el autocompletado de comandos de Angular CLI en la terminal:

```bash
# Para Bash
ng completion script > ~/.bashrc

# Para Zsh
ng completion script > ~/.zshrc

# Para Fish
ng completion script > ~/.config/fish/completions/ng.fish
```

Después de añadir el script, tendrás que reiniciar tu terminal o ejecutar `source ~/.bashrc` (o el archivo correspondiente para tu shell).

## Solución de problemas comunes

### Error de permisos en npm

Si obtienes errores de permisos al instalar paquetes globales:

```bash
# En Windows, ejecuta la terminal como administrador

# En macOS/Linux, usa sudo (no siempre recomendado)
sudo npm install -g @angular/cli

# O mejor, configura npm para instalar paquetes globales sin sudo
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
```

Luego añade `~/.npm-global/bin` a tu PATH.

### Conflictos de versiones

Si experimentas conflictos de versiones entre proyectos:

1. Desinstala Angular CLI global: `npm uninstall -g @angular/cli`
2. Usa npx para ejecutar la versión específica del proyecto: `npx -p @angular/cli ng`

## Siguientes pasos

Con Angular CLI instalado, ahora puedes configurar tu IDE siguiendo las instrucciones en [ide-setup.md](ide-setup.md).

