# Solución a Problemas Comunes en la Creación de Proyectos Angular

Esta guía te ayudará a resolver los problemas más comunes que podrías encontrar al crear y ejecutar tu primer proyecto Angular.

## Problemas durante la creación del proyecto

### Error: "Command 'ng' not found"

**Problema**: El comando `ng` no es reconocido por tu sistema.

**Solución**:
1. Asegúrate de que Angular CLI está instalado globalmente:
   ```bash
   npm install -g @angular/cli
   ```
2. Si ya está instalado, puede ser un problema de PATH. Intenta con:
   ```bash
   npx @angular/cli new mi-aplicacion
   ```

### Error: "No space left on device"

**Problema**: No hay suficiente espacio en el disco.

**Solución**:
1. Libera espacio en disco eliminando archivos o carpetas no necesarias
2. Usa la opción `--skip-install` para crear la estructura sin instalar dependencias:
   ```bash
   ng new mi-aplicacion --skip-install
   cd mi-aplicacion
   # Después de liberar espacio
   npm install
   ```

### Error: "npm ERR! code ETIMEDOUT"

**Problema**: Tiempo de espera agotado durante la instalación de dependencias.

**Solución**:
1. Verifica tu conexión a internet
2. Intenta usar un proxy diferente o una red más estable
3. Reinicia el proceso con:
   ```bash
   ng new mi-aplicacion --skip-install
   cd mi-aplicacion
   npm install
   ```

### Error: "Cannot find module '@angular/cli'"

**Problema**: Angular CLI no está correctamente instalado.

**Solución**:
```bash
npm uninstall -g @angular/cli
npm cache clean --force
npm install -g @angular/cli@latest
```

## Problemas al ejecutar el proyecto

### Error: "Port 4200 is already in use"

**Problema**: El puerto 4200 ya está siendo utilizado por otro proceso.

**Solución**:
```bash
# Usar un puerto diferente
ng serve --port=4201

# O buscar y matar el proceso que usa el puerto 4200
# En macOS/Linux
lsof -i:4200
kill -9 <PID>

# En Windows
netstat -ano | findstr :4200
taskkill /PID <PID> /F
```

### Error: "Cannot find module 'typescript'"

**Problema**: TypeScript no está correctamente instalado o configurado.

**Solución**:
```bash
npm install --save-dev typescript@latest
```

### Advertencia: "budgets: initial exceeded maximum"

**Problema**: El tamaño de la aplicación excede los límites configurados.

**Solución**: Aumenta los límites en `angular.json`:

```json
"budgets": [
  {
    "type": "initial",
    "maximumWarning": "2mb",
    "maximumError": "5mb"
  }
]
```

### Error: "Cannot find module '@angular/core'"

**Problema**: Dependencias faltantes o corruptas.

**Solución**:
```bash
# Limpia la caché e instala nuevamente
npm cache clean --force
rm -rf node_modules
npm install
```

## Problemas con la estructura del proyecto

### No se generó el módulo de enrutamiento

**Problema**: Olvidaste añadir la opción `--routing` al crear el proyecto.

**Solución**: Genera el módulo de enrutamiento manualmente:
```bash
ng generate module app-routing --flat --module=app
```

Luego, configura el módulo manualmente siguiendo la [documentación oficial de enrutamiento](https://angular.io/guide/router).

### Problemas con estilos (CSS/SCSS/Less)

**Problema**: Elegiste un formato y quieres cambiarlo más tarde.

**Solución**: Modifica los archivos y actualiza `angular.json` manualmente para cambiar las extensiones y los compiladores correspondientes. Alternativamente, crea un nuevo proyecto con las opciones correctas.

## Mejores prácticas

1. **Usa siempre la versión más reciente** de Angular CLI para nuevos proyectos
2. **Actualiza Angular CLI regularmente**:
   ```bash
   ng update @angular/cli @angular/core
   ```
3. **Mantén Node.js y npm actualizados** (pero verifica compatibilidad con Angular)
4. **Lee detenidamente los mensajes de error**, suelen contener información útil
5. **Consulta la documentación oficial** para problemas específicos

## Recursos adicionales

- [Documentación oficial de Angular](https://angular.io/docs)
- [Documentación de Angular CLI](https://angular.io/cli)
- [Repositorio GitHub de Angular CLI](https://github.com/angular/angular-cli/wiki)
- [Stack Overflow: Preguntas frecuentes sobre Angular](https://stackoverflow.com/questions/tagged/angular)
