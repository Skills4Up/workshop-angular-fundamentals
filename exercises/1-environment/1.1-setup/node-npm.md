# Instalación de Node.js y npm

Angular requiere Node.js y su gestor de paquetes npm para funcionar. Node.js es un entorno de ejecución de JavaScript del lado del servidor, y npm es el sistema de gestión de paquetes que viene incluido con Node.js.

## Requisitos de versión

Angular requiere una versión LTS (Long-Term Support) activa o en mantenimiento de Node.js. Para este workshop, recomendamos:

- **Node.js**: Versión 18.x o posterior
- **npm**: Versión 9.x o posterior (incluida con Node.js)

## Instalación en Windows

1. Visita [https://nodejs.org/](https://nodejs.org/) y descarga la versión LTS (recomendada para la mayoría de los usuarios)
2. Ejecuta el instalador descargado y sigue las instrucciones del asistente
3. Acepta el acuerdo de licencia y las opciones predeterminadas
4. Haz clic en "Install" para comenzar la instalación
5. Una vez completada, haz clic en "Finish"

## Instalación en macOS

### Opción 1: Usando el instalador

1. Visita [https://nodejs.org/](https://nodejs.org/) y descarga la versión LTS para macOS
2. Ejecuta el paquete descargado y sigue las instrucciones del asistente
3. La instalación añadirá automáticamente Node.js y npm a tu PATH

### Opción 2: Usando Homebrew (recomendado)

Si tienes [Homebrew](https://brew.sh/) instalado:

```bash
brew install node
```

## Instalación en Linux (Ubuntu/Debian)

```bash
# Actualiza los repositorios
sudo apt update

# Instala Node.js y npm
sudo apt install nodejs npm

# Alternativamente, para instalar la última versión LTS
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs
```

## Verificación de la instalación

Para verificar que Node.js y npm se han instalado correctamente, ejecuta los siguientes comandos en tu terminal o línea de comandos:

```bash
# Verificar la versión de Node.js
node --version
# Deberías ver algo como: v22.15.1

# Verificar la versión de npm
npm --version
# Deberías ver algo como: 9.8.1
```

## Actualización de npm (opcional)

A veces es recomendable actualizar npm a la última versión, incluso si acabas de instalar Node.js:

```bash
# Actualizar npm globalmente
npm install -g npm@latest
```

## Siguientes pasos

Una vez que hayas verificado que Node.js y npm están instalados correctamente, puedes proceder a la instalación del Angular CLI siguiendo las instrucciones en [cli-installation.md](cli-installation.md).

