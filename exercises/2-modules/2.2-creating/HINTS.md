# Mejores Prácticas para Creación de Módulos

Esta guía recopila las mejores prácticas, patrones comunes y soluciones a problemas frecuentes relacionados con la creación y organización de módulos en Angular.

## 🏆 Organización de módulos recomendada

### 📁 Estructura modular estándar

La mayoría de las aplicaciones Angular se benefician de esta estructura tripartita:

1. **Core Module**
   - Servicios singleton (una única instancia)
   - Guards e interceptores
   - Componentes que solo se usan una vez (header, footer)

2. **Shared Module**
   - Componentes, directivas y pipes reutilizables
   - Módulos comunes (CommonModule, FormsModule)
   - No contiene servicios singleton

3. **Feature Modules**
   - Módulos organizados por funcionalidad
   - Configurados para lazy loading
   - Incluyen sus propios componentes y servicios

### 📂 Estructura de carpetas recomendada

```
src/app/
  core/                  # Servicios singleton, interceptores
    services/
    interceptors/
    guards/
    core.module.ts
  shared/                # Componentes, directivas y pipes compartidos
    components/
    directives/
    pipes/
    shared.module.ts
  features/              # Módulos de características
    feature1/
      components/
      services/
      feature1.module.ts
    feature2/
      components/
      services/
      feature2.module.ts
  app.component.ts       # Componente raíz
  app.module.ts          # Módulo raíz
  app-routing.module.ts  # Configuración de rutas principal
```

## 🎯 Mejores prácticas por tipo de módulo

### 🧩 Core Module

```typescript
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    LoggingService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ]
})
export class CoreModule {
  // Prevenir importación múltiple
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule ya está cargado. Importar solo en AppModule.');
    }
  }
}
```

**Recomendaciones:**
- Importa CoreModule **solo en AppModule**
- Incluye un constructor para prevenir múltiples importaciones
- Proporciona servicios singleton aquí o usa `@Injectable({ providedIn: 'root' })`
- Incluye interceptores HTTP y guards aquí

### 🔄 Shared Module

```typescript
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    ButtonComponent,
    CardComponent,
    HighlightDirective,
    TruncatePipe
  ],
  exports: [
    // Re-exporta módulos Angular comunes
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    
    // Exporta componentes, directivas y pipes
    ButtonComponent,
    CardComponent,
    HighlightDirective,
    TruncatePipe
  ]
})
export class SharedModule { }
```

**Recomendaciones:**
- **No incluyas servicios singleton** en SharedModule
- **Re-exporta módulos comunes** para simplificar las importaciones
- **Exporta explícitamente** todo lo que debe estar disponible fuera
- **Evita lógica específica de dominio** en componentes compartidos

### 🚀 Feature Modules

```typescript
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FeatureRoutingModule
  ],
  declarations: [
    FeatureListComponent,
    FeatureDetailComponent,
    FeatureSpecificPipe
  ],
  providers: [
    // Solo servicios específicos de esta característica
    FeatureService
  ]
})
export class FeatureModule { }
```

**Recomendaciones:**
- **Importa SharedModule** para acceder a componentes compartidos
- **Configura lazy loading** para mejorar el rendimiento
- **Limita el alcance** de los servicios específicos de características
- **Estructura interna coherente** para todas las características

## 💡 Soluciones a problemas comunes

### 1. Dependencias circulares entre módulos

**Problema:** Módulo A importa Módulo B que importa Módulo A, causando un error circular.

**Soluciones:**
- Crea un tercer módulo C que contenga la funcionalidad compartida
- Utiliza inyección de dependencias para comunicación entre servicios
- Usa observables (BehaviorSubject) para compartir datos
- Reorganiza la jerarquía de módulos

### 2. Sobre-fragmentación de módulos

**Problema:** Demasiados módulos pequeños que complican la estructura.

**Soluciones:**
- Consolida módulos relacionados
- Sigue el principio de "un módulo por característica principal"
- Evalúa el balance entre modularidad y complejidad
- Usa submódulos solo cuando la característica es realmente compleja

### 3. Módulos demasiado grandes

**Problema:** Módulos con demasiadas responsabilidades que son difíciles de mantener.

**Soluciones:**
- Divide por subcaracterísticas
- Separa en múltiples módulos con responsabilidades claras
- Implementa submódulos para organizar el código
- Usa el análisis de tamaño de bundle para identificar problemas

### 4. Exportaciones incorrectas

**Problema:** Los componentes no están disponibles donde se necesitan.

**Soluciones:**
- Asegúrate de que los componentes estén declarados en algún módulo
- Verifica que el módulo exporta los componentes necesarios
- Importa el módulo correcto que exporta esos componentes
- Usa `ng --dry-run` para verificar la estructura

### 5. Rendimiento con muchos módulos

**Problema:** El tiempo de carga inicial es elevado.

**Soluciones:**
- Implementa lazy loading para módulos de características
- Usa estrategias de precarga inteligentes
- Optimiza el tamaño de SharedModule
- Considera técnicas de tree-shaking para eliminar código no utilizado

## 📋 Lista de verificación para módulos de calidad

✅ **Coherencia**: El módulo tiene un propósito único y claro  
✅ **Organización**: Estructura de carpetas consistente  
✅ **Exportaciones**: Solo exporta lo necesario para otros módulos  
✅ **Importaciones**: Solo importa lo que realmente necesita  
✅ **Naming**: Nombres descriptivos con sufijo "Module"  
✅ **Lazy loading**: Configurado para módulos de características  
✅ **Seguridad**: No hay exportaciones accidentales  
✅ **Prestaciones**: No hay declaraciones duplicadas entre módulos  

## 🔍 Herramientas y técnicas de análisis

1. **Visualización de dependencias:**
   - Usa herramientas como [Angular Architect](https://github.com/drienc/angular-architect) para visualizar dependencias

2. **Análisis de módulos:**
   ```bash
   ng build --stats-json
   npx webpack-bundle-analyzer dist/[project-name]/stats.json
   ```

3. **Detección de dependencias circulares:**
   ```bash
   ng build --circular-dependency-error
   ```

## 🚀 Estrategias avanzadas

### Módulos con configuración (forRoot)

Para módulos que necesitan configuración global:

```typescript
@NgModule({})
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
```

### Módulos por características vs. por tipos

**Por características** (recomendado):
- Organizado por funcionalidad del negocio
- Mejor para lazy loading
- Más cohesivo y autónomo

**Por tipos** (menos común):
- Organizado por tipo técnico (components, directives, etc.)
- Dificulta el lazy loading
- Puede causar dependencias circulares

### Granularidad adecuada

✅ **Demasiado grande:** Si un módulo tiene más de 20-30 declaraciones, considera dividirlo  
✅ **Demasiado pequeño:** Si un módulo solo tiene 1-2 declaraciones, quizás sea excesiva fragmentación  
✅ **Balance adecuado:** Módulos organizados por características cohesivas
