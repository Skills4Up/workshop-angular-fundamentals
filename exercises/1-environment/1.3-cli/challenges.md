# Ejercicios Prácticos con Angular CLI

Estos ejercicios te ayudarán a dominar el Angular CLI. Prueba cada uno y verifica los resultados.

## 🎯 Ejercicio 1: Exploración del CLI

**Objetivo:** Familiarizarte con la ayuda y documentación del CLI.

1. Abre una terminal en tu proyecto Angular
2. Ejecuta los siguientes comandos y observa la salida:
   ```bash
   ng --version
   ng help
   ng generate --help
   ```
3. Explora la estructura del proyecto utilizando:
   ```bash
   ng config
   ```

**Pregunta:** ¿Qué información proporciona `ng --version` aparte de la versión del CLI?

## 🎯 Ejercicio 2: Generación básica de componentes

**Objetivo:** Practicar la generación de componentes con diferentes opciones.

1. Genera un componente básico:
   ```bash
   ng generate component components/button
   ```

2. Genera un componente con estilo y plantilla en línea:
   ```bash
   ng generate component components/icon --inline-style --inline-template
   ```

3. Genera un componente sin pruebas y exportándolo:
   ```bash
   ng generate component components/card --skip-tests --export
   ```

**Pregunta:** ¿Qué archivos se generan en cada caso? Compara las diferencias.

## 🎯 Ejercicio 3: Creación de una estructura modular

**Objetivo:** Crear una estructura de módulos y componentes para una funcionalidad.

1. Genera un módulo de características con routing:
   ```bash
   ng generate module features/products --routing
   ```

2. Genera un componente dentro de ese módulo:
   ```bash
   ng generate component features/products/product-list --module=features/products
   ```

3. Genera un servicio para este módulo:
   ```bash
   ng generate service features/products/services/product
   ```

**Tarea:** Agrega la ruta para el componente `product-list` en el archivo de routing del módulo productos.

## 🎯 Ejercicio 4: Generación avanzada de elementos

**Objetivo:** Experimentar con diferentes tipos de elementos generables.

1. Genera una interfaz:
   ```bash
   ng generate interface models/product
   ```

2. Genera un pipe personalizado:
   ```bash
   ng generate pipe shared/pipes/truncate
   ```

3. Genera un guard para proteger rutas:
   ```bash
   ng generate guard core/guards/auth
   ```

**Pregunta:** ¿Qué opciones te ofrece el CLI al generar un guard?

## 🎯 Ejercicio 5: Uso práctico del modo dry-run

**Objetivo:** Aprender a previsualizar la generación antes de ejecutarla.

1. Ejecuta el siguiente comando con `--dry-run`:
   ```bash
   ng generate component shared/layouts/main-layout --dry-run
   ```

2. Modifica el comando para incluir algunas opciones adicionales y ejecuta nuevamente con `--dry-run`:
   ```bash
   ng generate component shared/layouts/main-layout --inline-style --skip-tests --dry-run
   ```

3. Cuando estés satisfecho con el resultado, ejecuta el comando sin `--dry-run`.

**Tarea:** Usa `--dry-run` para planificar la estructura de una característica completa antes de implementarla.

## 🎯 Ejercicio 6: Reto de estructura completa

**Objetivo:** Aplicar todos los conceptos para crear una estructura modular más compleja.

Crea una estructura para una funcionalidad de "administración de usuarios" con:

1. Un módulo de características con routing y carga perezosa
2. Componentes para listar, ver detalles, editar y crear usuarios
3. Un servicio compartido para las operaciones CRUD
4. Una interfaz para el modelo de usuario
5. Un guard para proteger las rutas de edición

**Instrucciones:**
1. Planifica la estructura usando comandos con `--dry-run`
2. Implementa la estructura con los comandos apropiados
3. Verifica que los componentes están correctamente declarados en sus módulos

## 🔍 Verificación de resultados

Después de completar estos ejercicios, deberías:

1. Tener una estructura de proyecto organizada y modular
2. Entender cómo generar diferentes tipos de elementos
3. Saber utilizar las opciones principales del CLI
4. Poder planificar la estructura de un proyecto usando `--dry-run`

## 💡 Reto extra

Intenta crear un alias personalizado para un comando angular CLI complejo que utilices frecuentemente.

Por ejemplo, para crear un componente con configuraciones específicas:

En macOS/Linux:
```bash
alias ng-comp='ng generate component --skip-tests --inline-style'
```

Luego podrías usarlo como:
```bash
ng-comp features/dashboard/widget
```

