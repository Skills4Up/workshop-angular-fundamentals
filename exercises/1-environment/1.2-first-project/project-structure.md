# Estructura de Archivos de un Proyecto Angular

En este documento exploraremos la estructura de archivos y carpetas que Angular CLI genera al crear un nuevo proyecto. Entender esta estructura te ayudará a navegar y organizar tu código de manera eficiente.

## Estructura de directorios raíz

Después de ejecutar `ng new mi-aplicacion`, se genera la siguiente estructura de directorios:

```
mi-aplicacion/
├── node_modules/          # Dependencias instaladas
├── src/                   # Código fuente de la aplicación
├── .angular/              # Archivos de configuración para el CLI
├── .vscode/               # Configuración de VS Code (si aplica)
├── .editorconfig          # Configuración del editor de código
├── .gitignore             # Archivos ignorados por Git
├── angular.json           # Configuración principal de Angular
├── package.json           # Dependencias y scripts npm
├── package-lock.json      # Versiones exactas de dependencias
├── README.md              # Documentación del proyecto
├── tsconfig.json          # Configuración de TypeScript
└── tsconfig.app.json      # Configuración de TS específica para la app
```

## Directorio src/

El directorio `src/` deberia contener el código fuente real de tu aplicación, como este ejemplo:

```
src/
├── app/                   # Componentes, servicios, módulos, etc.
│   ├── app.routes.ts  # Módulo de enrutamiento (si --routing=true)
│   ├── app.component.css      # Estilos del componente raíz
│   ├── app.component.html     # Plantilla del componente raíz
│   ├── app.component.spec.ts  # Tests del componente raíz
│   ├── app.component.ts       # Lógica del componente raíz
│   └── app.module.ts          # Módulo raíz de la aplicación
├── assets/                # Archivos estáticos (imágenes, fuentes, etc.)
├── environments/          # Configuraciones para diferentes entornos
│   ├── environment.ts     # Configuración de desarrollo
│   └── environment.prod.ts # Configuración de producción
├── favicon.ico            # Icono de la página
├── index.html             # Página HTML principal
├── main.ts                # Punto de entrada de la aplicación
├── polyfills.ts           # Polyfills para compatibilidad con navegadores
└── styles.css             # Estilos globales
```

## Archivos de configuración clave

### angular.json

Este archivo contiene la configuración principal de tu proyecto Angular, incluyendo:

- Rutas de archivos fuente
- Configuración de compilación
- Configuración de optimización
- Configuración de test
- Configuración de lint

Es el archivo central que controla cómo el CLI construye y sirve tu aplicación.

### package.json

Contiene:
- Dependencias de la aplicación (`dependencies`)
- Dependencias de desarrollo (`devDependencies`)
- Scripts npm para construir, ejecutar y probar la aplicación
- Metadatos del proyecto

### tsconfig.json

Configura cómo TypeScript compila tu código, incluyendo:
- Opciones del compilador
- Archivos a incluir/excluir
- Reglas estrictas de tipado

## Componentes clave en src/app/

### app.module.ts

El módulo raíz de tu aplicación que define:
- Qué componentes incluye la aplicación
- Qué módulos se importan
- Qué servicios se proporcionan
- Cuál es el componente bootstrap (punto de entrada)

Ejemplo básico:

```typescript
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### app.component.ts

El componente raíz que define:
- El selector para usar el componente (`app-root`)
- La plantilla HTML (`templateUrl`)
- Los estilos CSS (`styleUrls`)
- La lógica del componente

Ejemplo básico:

```typescript
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mi-aplicacion';
}
```

### app-routing.module.ts (si se habilita el enrutamiento)

Configura las rutas de la aplicación, definiendo qué componente se muestra para cada URL.

## Entendiendo main.ts

El archivo `main.ts` es el punto de entrada real de tu aplicación Angular. Este archivo:

1. Importa los polyfills necesarios
2. Configura el entorno (producción o desarrollo)
3. Arranca la aplicación llamando a `platformBrowserDynamic().bootstrapModule(AppModule)`

## Archivos de entorno

Los archivos en `src/environments/` te permiten definir valores de configuración que cambian según el entorno (desarrollo, producción, etc.). Esto es útil para URL de APIs, claves, etc.

## Personalización de la estructura

Aunque esta es la estructura estándar, puedes personalizarla:

- Crear subcarpetas en `src/app/` para organizar características
- Añadir directorios adicionales para assets
- Modificar la configuración en `angular.json`

## Siguientes pasos

Ahora que conoces la estructura básica de un proyecto Angular, continúa con start-commands.md para aprender a ejecutar y probar tu aplicación.

