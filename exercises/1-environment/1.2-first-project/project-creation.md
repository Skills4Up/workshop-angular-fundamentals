# Creación de un Proyecto Angular

En este documento aprenderás a utilizar Angular CLI para crear un nuevo proyecto Angular y a configurar sus opciones básicas.

## Comando básico para crear un proyecto

El comando más simple para crear un nuevo proyecto Angular es:

```bash
ng new mi-aplicacion-angular
```

Este comando creará un nuevo directorio llamado "mi-aplicacion-angular" que contendrá un proyecto Angular inicial con la configuración por defecto.

## Opciones importantes al crear un proyecto

Al ejecutar `ng new`, el CLI te hará algunas preguntas para personalizar tu proyecto:

1. **¿Quieres agregar el enrutamiento de Angular?** 
   - Si respondes "sí", Angular CLI configurará el módulo de enrutamiento.
   - Recomendación: "sí" para aplicaciones con múltiples vistas.

2. **¿Qué formato de hojas de estilo quieres usar?**
   - Opciones: CSS, SCSS, Sass, Less, o Stylus
   - Recomendación: CSS para principiantes, SCSS para proyectos más complejos.

## Opciones avanzadas mediante flags

También puedes especificar opciones directamente en el comando usando flags:

```bash
ng new mi-aplicacion-angular --routing --style=scss --skip-tests --prefix=app
```

Aquí hay algunas opciones útiles:

| Flag | Descripción |
|------|-------------|
| `--routing` | Genera un módulo de enrutamiento |
| `--style=scss` | Usar SCSS como preprocesador CSS |
| `--skip-tests` | No genera archivos de prueba |
| `--prefix=app` | Define un prefijo para los selectores de componentes |
| `--skip-install` | No instala las dependencias de npm (útil para CI/CD) |
| `--create-application=false` | Crea un espacio de trabajo sin aplicación inicial |
| `--minimal` | Crea un proyecto con configuración mínima |

## Crear un proyecto con una configuración personalizada

Para un entorno de aprendizaje, recomendamos crear un proyecto con esta configuración:

```bash
ng new mi-primera-app-angular --routing --style=scss --prefix=app --skip-git
```

Este comando:
- Crea un proyecto llamado "mi-primera-app-angular"
- Incluye el módulo de enrutamiento
- Usa SCSS para estilos
- Establece "app" como prefijo de componentes (es el valor por defecto)
- No inicializa un repositorio Git (útil si ya tienes Git configurado o quieres hacerlo manualmente)

## Plantillas predefinidas (schematics)

Angular CLI también permite usar plantillas predefinidas (schematics) para crear proyectos con configuraciones específicas:

```bash
# se debe tener un collection.json para ejecutarlo
ng new mi-aplicacion --collection=@angular/material/schematics/collection.json
```

Algunas colecciones populares:

- **Angular Material**: `@angular/material/schematics/collection.json`
- **NgRx**: `@ngrx/schematics/collection.json`

## Crear un proyecto con Angular Material preconfigurado

Para crear un proyecto con Angular Material preconfigurado:

```bash
# Primero, crear el proyecto normal
ng new mi-app-material --routing

# Luego, agregar Angular Material
cd mi-app-material
ng add @angular/material
```

El comando `ng add` hará preguntas sobre:
- Tema de Material Design a usar
- Tipografía global
- Animaciones de Angular Material

## Ejercicio Práctico

1. Crea un nuevo proyecto Angular con las siguientes características:
   - Nombre: `mi-primera-angular-app`
   - Con enrutamiento habilitado
   - Usando CSS como formato de estilos
   - Sin crear repositorio Git

```bash
ng new mi-primera-angular-app --routing --skip-git
```

2. Espera a que el proceso de creación e instalación termine (puede tardar varios minutos dependiendo de tu conexión a internet y la potencia de tu máquina).

3. Explora la estructura de archivos generada (ver project-structure.md para más detalles).

## Siguiente paso

Una vez que hayas creado tu proyecto, continúa con [project-structure.md](project-structure.md) para entender la estructura de archivos y carpetas que Angular CLI ha generado.

