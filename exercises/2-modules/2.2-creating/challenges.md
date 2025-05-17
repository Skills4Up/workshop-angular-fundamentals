# Retos Prácticos de Creación de Módulos

Estos ejercicios te ayudarán a practicar y consolidar tus conocimientos sobre la creación y organización de módulos en Angular.

## 🎯 Reto 1: Estructura modular básica

**Objetivo:** Crear la estructura modular básica para una aplicación de gestión de tareas.

**Instrucciones:**
1. Crea un módulo raíz (AppModule - ya existente)
2. Genera un módulo compartido (SharedModule)
3. Crea un módulo para la gestión de tareas (TasksModule) con su propio routing
4. Configura el lazy loading para el módulo de tareas

**Comandos a utilizar:**
```bash
# Para el módulo compartido
ng generate module shared

# Para el módulo de tareas con routing
ng generate module features/tasks --routing

# Componentes para el módulo de tareas
ng generate component features/tasks/task-list --module=features/tasks
ng generate component features/tasks/task-detail --module=features/tasks
```

**Configuración de lazy loading (en app-routing.module.ts):**
```typescript
const routes: Routes = [
  {
    path: 'tasks',
    loadChildren: () => import('./features/tasks/tasks.module')
      .then(m => m.TasksModule)
  },
  { path: '', redirectTo: '/tasks', pathMatch: 'full' }
];
```

## 🎯 Reto 2: Módulo compartido completo

**Objetivo:** Crear un módulo compartido con componentes UI reutilizables.

**Instrucciones:**
1. Genera un módulo compartido
2. Crea 3 componentes UI en este módulo (botón, tarjeta, alerta)
3. Crea una directiva y un pipe personalizado
4. Exporta todo correctamente para su uso en otros módulos
5. Importa el módulo compartido en el módulo de tareas

**Comandos a utilizar:**
```bash
# Módulo compartido
ng generate module shared

# Componentes UI
ng generate component shared/components/ui-button --export
ng generate component shared/components/ui-card --export
ng generate component shared/components/ui-alert --export

# Directiva
ng generate directive shared/directives/highlight --export

# Pipe
ng generate pipe shared/pipes/truncate --export
```

**Estructura del SharedModule:**
```typescript
// shared.module.ts
@NgModule({
  declarations: [
    UiButtonComponent,
    UiCardComponent,
    UiAlertComponent,
    HighlightDirective,
    TruncatePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    UiButtonComponent,
    UiCardComponent,
    UiAlertComponent,
    HighlightDirective,
    TruncatePipe
  ]
})
export class SharedModule { }
```

## 🎯 Reto 3: Arquitectura modular completa

**Objetivo:** Implementar una arquitectura modular completa para una aplicación de e-commerce.

**Instrucciones:**
1. Crea un módulo Core para servicios singleton
2. Implementa un módulo compartido (SharedModule)
3. Crea 3 módulos de características con lazy loading:
   - ProductsModule
   - CartModule
   - CheckoutModule
4. Configura el routing apropiadamente
5. Asegúrate de que cada módulo tenga la estructura adecuada de carpetas

**Comandos a utilizar:**
```bash
# Módulo Core
ng generate module core
ng generate service core/services/auth
ng generate service core/services/logging

# Módulo SharedModule 
ng generate module shared

# Módulos de características con lazy loading
ng generate module features/products --route=products --module=app-routing
ng generate module features/cart --route=cart --module=app-routing
ng generate module features/checkout --route=checkout --module=app-routing

# Componentes para Products
ng generate component features/products/components/product-list --module=features/products
ng generate component features/products/components/product-detail --module=features/products
ng generate service features/products/services/product
```

**Estructura de carpetas final:**
```
src/app/
  app.module.ts
  app-routing.module.ts
  core/
    core.module.ts
    services/
      auth.service.ts
      logging.service.ts
  shared/
    shared.module.ts
    components/
    directives/
    pipes/
  features/
    products/
      products.module.ts
      products-routing.module.ts
      components/
        product-list/
        product-detail/
      services/
        product.service.ts
    cart/
      cart.module.ts
      cart-routing.module.ts
      components/
      services/
    checkout/
      checkout.module.ts
      checkout-routing.module.ts
      components/
      services/
```

## 🎯 Reto 4: Módulo con configuración

**Objetivo:** Crear un módulo compartido que utilice el patrón `.forRoot()` para configuración global.

**Instrucciones:**
1. Crea un módulo utilitario llamado ConfigModule
2. Implementa el patrón `.forRoot()` para permitir configuración
3. Crea un servicio que utilice la configuración proporcionada
4. Importa el módulo en el AppModule utilizando `.forRoot()`

**Implementación del ConfigModule:**
```typescript
// Definir interfaz para la configuración
export interface ConfigOptions {
  apiUrl: string;
  debounceTime: number;
}

// Token de inyección para la configuración
export const CONFIG_OPTIONS = new InjectionToken<ConfigOptions>('config.options');

@NgModule({})
export class ConfigModule {
  static forRoot(options: ConfigOptions): ModuleWithProviders<ConfigModule> {
    return {
      ngModule: ConfigModule,
      providers: [
        {
          provide: CONFIG_OPTIONS,
          useValue: options
        }
      ]
    };
  }
}
```

**Servicio que usa la configuración:**
```typescript
@Injectable()
export class ConfigService {
  constructor(@Inject(CONFIG_OPTIONS) private options: ConfigOptions) {}
  
  getApiUrl(): string {
    return this.options.apiUrl;
  }
  
  getDebounceTime(): number {
    return this.options.debounceTime;
  }
}
```

**Importación en AppModule:**
```typescript
@NgModule({
  imports: [
    BrowserModule,
    ConfigModule.forRoot({
      apiUrl: 'https://api.example.com',
      debounceTime: 300
    })
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## 🎯 Reto 5: Refactorización modular

**Objetivo:** Refactorizar una aplicación con todo en el AppModule para usar una arquitectura modular apropiada.

**Instrucciones:**
1. Identifica componentes que deberían estar en módulos compartidos
2. Identifica funcionalidades que deberían ser módulos de características
3. Crea una estructura modular apropiada
4. Mueve los componentes a los módulos correctos
5. Configura las importaciones y exportaciones correctamente

**Preguntas de análisis:**
1. ¿Qué criterios utilizaste para decidir qué va en cada módulo?
2. ¿Qué componentes identificaste como candidatos para un módulo compartido?
3. ¿Qué funcionalidades se beneficiarían más del lazy loading?
4. ¿Cómo manejarías los servicios compartidos vs. servicios específicos de características?

## 💡 Pistas para los retos

- Usa `--dry-run` para verificar los archivos que se generarán antes de crearlos
- Recuerda importar SharedModule en cada módulo de características que lo necesite
- El CoreModule solo debe importarse una vez en el AppModule
- Los módulos de características deben ser lo más independientes posible
- No olvides exportar los componentes que necesitarás usar fuera de su módulo declarante

