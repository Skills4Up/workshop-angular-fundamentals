# Patrones Comunes de Importación y Exportación

Esta guía resume patrones, mejores prácticas y soluciones a problemas comunes relacionados con la importación y exportación de módulos en Angular.

## 🧩 Patrones efectivos de organización modular

### 1. Patrón Core + Shared + Features

Este es el patrón estándar recomendado para aplicaciones Angular:

```typescript
// Estructura de app.module.ts
@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule,        // Servicios singleton
    SharedModule,      // Componentes compartidos
    AppRoutingModule,  // Routing principal
    // Módulos de características que no usan lazy loading
    HomeModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

** Características:**
- CoreModule: Para servicios singleton y componentes usados una vez
- SharedModule: Para componentes, directivas y pipes reutilizables
- Feature Modules: Un módulo por característica principal
- Lazy Loading: Para módulos que no se necesitan inmediatamente

### 2. Patrón de "Barrel" con index.ts

Utiliza archivos "barrel" para simplificar importaciones:

```typescript
// shared/index.ts
export * from './shared.module';
export * from './components/button.component';
export * from './pipes/format.pipe';

// Luego en otro archivo:
import { ButtonComponent, FormatPipe } from './shared';
```

### 3. Patrón de API pública de módulo

Define claramente qué elementos son parte de la API pública de un módulo:

```typescript
// Estructura interna del módulo (no exportada)
const COMPONENTS = [
  PublicComponent,
  AnotherPublicComponent,
  InternalComponent1,
  InternalComponent2
];

@NgModule({
  declarations: COMPONENTS,
  exports: [
    // Solo exportamos los componentes "públicos"
    PublicComponent,
    AnotherPublicComponent
  ]
})
export class FeatureModule { }
```

### 4. Patrón de re - exportación para módulos comunes

Simplifica las importaciones re - exportando módulos comunes:

```typescript
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [
    // Componentes compartidos
  ],
  exports: [
    // Re-exporta módulos Angular comunes
    CommonModule,
    ReactiveFormsModule,
    RouterModule,

    // Exporta componentes propios
    // ...
  ]
})
export class SharedModule { }
```

## 💡 Soluciones a problemas comunes

### 1. Error: Template parse errors: Component is not part of any NgModule

  ** Problema:** Intentas usar un componente que no está disponible en el módulo actual.

** Soluciones:**
  ```typescript
// ✅ Asegúrate de que el componente esté declarado en algún módulo
@NgModule({
  declarations: [MiComponente]
})

// ✅ Si el componente está en otro módulo, asegúrate de que esté exportado
@NgModule({
  declarations: [ComponenteCompartido],
  exports: [ComponenteCompartido]
})

// ✅ Asegúrate de importar el módulo que exporta el componente
@NgModule({
  imports: [ModuloQueExportaElComponente]
})
```

### 2. Dependencias circulares entre módulos

  ** Problema:** El módulo A importa el módulo B, que a su vez importa el módulo A.

** Soluciones:**
  1. ** Crear un tercer módulo:** Extrae los componentes compartidos a un nuevo módulo

    ```typescript
   // Antes (con problema):
   // ModuloA importa ModuloB y ModuloB importa ModuloA

   // Después (solución):
   // ModuloCompartido exporta componentes compartidos
   // ModuloA y ModuloB importan ModuloCompartido
   ```

2. ** Usar comunicación a través de servicios:**

  ```typescript
   // ServicioCompartido como intermediario
   @Injectable({ providedIn: 'root' })
   export class ServicioCompartido {
     // Lógica compartida aquí
   }
   ```

3. ** Importación dinámica con loadChildren:**

  ```typescript
   const routes: Routes = [
     {
       path: 'modulob',
       loadChildren: () => import('./modulob/modulob.module')
                           .then(m => m.ModuloB)
     }
   ];
   ```

### 3. Duplicación de importaciones en múltiples módulos

** Problema:** Importar los mismos módulos(FormsModule, etc.) en múltiples módulos de características.

** Solución:** Utiliza un SharedModule que re - exporte estos módulos comunes:

```typescript
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }

// Luego en otros módulos:
@NgModule({
  imports: [
    SharedModule // Obtienes todos los módulos re-exportados
  ]
})
```

### 4. Problemas con CoreModule

** Problema:** Importar CoreModule en múltiples lugares causando múltiples instancias de servicios singleton.

** Solución:** Prevenir la importación múltiple del CoreModule:

```typescript
@NgModule({
  // ...definición del módulo
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule ya está cargado. Importa solo en AppModule.'
      );
    }
  }
}
```

## 📋 Guía de mejores prácticas

### Para CoreModule
- Importa CoreModule ** solo en AppModule **
- Incluye servicios singleton, interceptores, guards
- Incluye componentes que se usan una sola vez(header, footer)
- No exportes servicios(usa providedIn: 'root' en su lugar)

### Para SharedModule
- No incluyas servicios con estado en SharedModule
- Re - exporta módulos Angular comunes(CommonModule, FormsModule)
- Exporta explícitamente cada componente, directiva y pipe
- Evita dependencias a módulos de características

### Para Módulos de Características
- Cada módulo debe representar una funcionalidad de negocio
- Configura lazy loading cuando sea posible
- Importa solo lo que necesitas(SharedModule debería ser suficiente)
- Proporciona servicios específicos de la característica en el propio módulo

### Para AppModule
- Mantén AppModule lo más ligero posible
- Importa CoreModule
- Importa módulos de características(no lazy - loaded)
- Configura las rutas principales

## 🔎 Herramientas de diagnóstico

### Visualización de dependencias

  ```bash
npm install -g ngd
ngd -p src/tsconfig.app.json
```

### Detección de dependencias circulares

  ```bash
ng build --configuration=production
```

Angular CLI mostrará un error si detecta dependencias circulares.

### Análisis de bundles

  ```bash
ng build --stats-json
npx webpack-bundle-analyzer dist/stats.json
```

## 🌟 Estrategias avanzadas

### Carga diferida de módulos secundarios

  ```typescript
// En app-routing.module.ts
const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin.module')
                        .then(m => m.AdminModule)
  }
];
```

### Módulos configurables con forRoot

  ```typescript
@NgModule({
  // ...definición del módulo
})
export class ConfigurableModule {
  static forRoot(config: any): ModuleWithProviders<ConfigurableModule> {
    return {
      ngModule: ConfigurableModule,
      providers: [
        { provide: CONFIG_TOKEN, useValue: config }
      ]
    };
  }
}

// Uso:
@NgModule({
  imports: [
    ConfigurableModule.forRoot({ apiUrl: 'https://api.example.com' })
  ]
})
```

### Módulos de características con sub - features

```
features/
  admin/               # Módulo principal
    admin.module.ts
    admin-routing.module.ts
    user-management/   # Sub-feature
      user-management.module.ts
    content-management/ # Sub-feature
      content-management.module.ts
```
