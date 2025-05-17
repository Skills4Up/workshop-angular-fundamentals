
# Workshop: Introducción a Angular y TypeScript

Un workshop intensivo para iniciarse en el desarrollo frontend con Angular y TypeScript, enfocado en los fundamentos esenciales para construir aplicaciones web modernas.

## 🎯 Objetivos de aprendizaje

Al finalizar este taller, podrás:

- **Comprender** los fundamentos de TypeScript y por qué se usa con Angular
- **Desarrollar** componentes básicos siguiendo las mejores prácticas
- **Utilizar** el sistema de templates y data binding de Angular
- **Crear** servicios sencillos para compartir datos entre componentes
- **Implementar** navegación básica mediante el sistema de routing

## 📚 Estructura del Repositorio (Learn-by-Doing)

## 📄 Archivos principales

- README.md - Información general e instrucciones
- SETUP.md - Instrucciones detalladas de instalación
- LEARNING_PATH.md - Ruta de aprendizaje y objetivos

## 📚 Documentación y guías

| Archivo               | Descripción                                |
| --------------------- | ------------------------------------------ |
| angular-cheatsheet.md | Cheatsheet básica de Angular               |
| typescript-basics.md  | Fundamentos de TypeScript                  |
| knowledge-check.md    | Preguntas de verificación de conocimientos |
| resources.md          | Enlaces a recursos adicionales             |

## 🧪 Ejercicios de aprendizaje (3 horas)

### Bloque 1: Fundamentos de TypeScript (60 min)

<details>
<summary><strong>1.1 Introducción a TypeScript</strong> (20 min)</summary>


- [README.md](exercises/1-fundamentals/1.1-introduction/README.md) - Ventajas de TypeScript sobre JavaScript
- [types.ts](exercises/1-fundamentals/1.1-introduction/types.ts) - Tipos básicos y anotaciones
- [interfaces.ts](exercises/1-fundamentals/1.1-introduction/interfaces.ts) - Interfaces y tipos personalizados
- [start.ts](exercises/1-fundamentals/1.1-introduction/start.ts) - Ejercicios para completar
- [HINTS.md](exercises/1-fundamentals/1.1-introduction/HINTS.md) - Guía estratégica de solución

</details>

<details>
<summary><strong>1.2 Clases y Objetos</strong> (20 min)</summary>

- [README.md](exercises/1-fundamentals/1.2-classes/README.md) - Programación orientada a objetos en TypeScript
- [classes.ts](exercises/1-fundamentals/1.2-classes/classes.ts) - Definición de clases y herencia
- [modifiers.ts](exercises/1-fundamentals/1.2-classes/modifiers.ts) - Modificadores de acceso
- [start.ts](exercises/1-fundamentals/1.2-classes/start.ts) - Plantillas para implementación
- [challenges.ts](exercises/1-fundamentals/1.2-classes/challenges.ts) - Retos de implementación OOP
- [HINTS.md](exercises/1-fundamentals/1.2-classes/HINTS.md) - Estrategias para modelado de clases
- [test.ts](exercises/1-fundamentals/1.2-classes/test.ts) - Tests para verificar implementaciones

</details>

<details>
<summary><strong>1.3 Funciones y Genéricos</strong> (20 min)</summary>

- [README.md](exercises/1-fundamentals/1.3-functions/README.md) - Guía de funciones en TypeScript
- [functions.ts](exercises/1-fundamentals/1.3-functions/functions.ts) - Tipos de funciones y parámetros
- [generics.ts](exercises/1-fundamentals/1.3-functions/generics.ts) - Uso básico de genéricos
- [start.ts](exercises/1-fundamentals/1.3-functions/start.ts) - Ejercicios para completar
- [challenges.ts](exercises/1-fundamentals/1.3-functions/challenges.ts) - Retos de implementación
- [HINTS.md](exercises/1-fundamentals/1.3-functions/HINTS.md) - Guía para implementación
- [test.ts](exercises/1-fundamentals/1.3-functions/test.ts) - Tests automatizados de funciones

</details>

### Bloque 2: Primeros pasos con Angular (65 min)

<details>
<summary><strong>2.1 Estructura de un proyecto Angular</strong> (20 min)</summary>

- [README.md](exercises/2-angular-basics/2.1-structure/README.md) - Anatomía de un proyecto Angular
- [project-structure.md](exercises/2-angular-basics/2.1-structure/project-structure.md) - Explicación de carpetas y archivos
- [angular.json](exercises/2-angular-basics/2.1-structure/angular.json) - Configuración básica explicada
- [start-commands.md](exercises/2-angular-basics/2.1-structure/start-commands.md) - Comandos CLI para ejecutar
- [challenges.md](exercises/2-angular-basics/2.1-structure/challenges.md) - Exploración del proyecto
- [HINTS.md](exercises/2-angular-basics/2.1-structure/HINTS.md) - Guía para navegar el proyecto

</details>

## 🔄 Metodología de aprendizaje

Este workshop implementa un enfoque de aprendizaje activo para principiantes, combinando **teoría concisa**, **ejemplos sencillos** y **práctica inmediata**. Cada ejercicio está diseñado para ofrecer:

- **Explicaciones claras** de conceptos fundamentales
- **Ejemplos minimalistas** que ilustran un solo concepto a la vez
- **Ejercicios guiados** que refuerzan el aprendizaje
- **Retos incrementales** que aplican lo aprendido

## 📋 Cobertura de funcionalidades

Este workshop abarca los conceptos esenciales para comenzar con Angular y TypeScript:

### 🧩 Bloque 1: Fundamentos de TypeScript

- **Tipos básicos**: string, number, boolean, array, any
- **Interfaces**: definición, implementación y extensión
- **Clases**: creación, herencia y modificadores
- **Funciones**: tipos, parámetros opcionales y valores por defecto
- **Genéricos**: concepto básico y ejemplos sencillos

### 🔄 Bloque 2: Primeros pasos con Angular

- **Estructura de proyecto**: organización de archivos y carpetas
- **Módulos**: concepto básico de NgModule
- **Componentes**: creación, estructura y decoradores
- **Templates**: sintaxis básica y bindings
- **Data binding**: interpolación, property binding y event binding

### 🔧 Bloque 3: Características esenciales

- **Directivas**: ngIf, ngFor y ngClass
- **Servicios básicos**: creación y uso
- **Inyección de dependencias**: fundamentos
- **Entrada/Salida**: comunicación entre componentes con @Input y @Output
- **Proyecto práctico**: aplicación de conceptos básicos

## 🚀 Instrucciones de instalación

```bash
# Clonar el repositorio
git clone https://github.com/skills4up/workshop-angular-typescript.git

# Posicionarse en la carpeta
cd workshop-angular-typescript

# Instalar dependencias
npm install

# Instalar Angular CLI globalmente
npm install -g @angular/cli

# Verificar la instalación
ng version

# Iniciar el servidor de desarrollo
ng serve
```

## 🧩 Cómo aprovechar al máximo el workshop

### Durante el workshop

1. **Estructura "Concepto → Ejemplo → Práctica"**
   - Cada sección introduce un concepto básico
   - Sigue con ejemplos claros y concisos
   - Termina con ejercicios prácticos sencillos

2. **Uso de herramientas básicas**
   - Navegador para visualizar la aplicación
   - Consola del navegador para ver resultados
   - Editor de código para modificar ejemplos
   - Terminal para ejecutar comandos de Angular CLI

3. **Participación activa**
   - Preguntas sobre conceptos fundamentales
   - Resolución de ejercicios en tiempo real
   - Discusión de conceptos básicos en grupo

### Después del workshop

- Práctica con ejercicios adicionales incluidos
- Guía de conceptos fundamentales para referencia
- Lista de recursos para profundizar en Angular
- Mini-proyectos para seguir practicando

## 📋 Requisitos previos

- Node.js v14+ instalado
- Conocimientos básicos de JavaScript
- Familiaridad con HTML y CSS
- Editor de código (Visual Studio Code recomendado)
- No se requiere experiencia previa con TypeScript o Angular

## 🤝 Contribuciones

Este proyecto sigue las convenciones de Angular para contribuciones:

1. Crea un issue describiendo la mejora o problema
2. Realiza cambios en una rama con prefijo según el tipo:
   - `feat/` para nuevas funcionalidades
   - `fix/` para correcciones
   - `docs/` para documentación
   - `refactor/` para refactorización
3. Usa mensajes de commit siguiendo el formato `type(scope): message`
4. Envía un PR vinculado al issue original

Todas las contribuciones incluirán los créditos correspondientes.

## 📜 Licencia

Este material está licenciado bajo [Creative Commons Attribution-NonCommercial 4.0 International](https://creativecommons.org/licenses/by-nc/4.0/). Puedes:

- Compartir y adaptar el material
- Dar crédito apropiado al autor original

No puedes:

- Usar el material con fines comerciales sin autorización
- Distribuir versiones modificadas bajo términos más restrictivos

Para usos comerciales o autorizaciones especiales, contacta a [info@skills4up.com](mailto:info@skills4up.com).
