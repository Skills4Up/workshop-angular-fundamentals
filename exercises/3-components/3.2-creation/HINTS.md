# Soluciones a Errores Comunes en Creación de Componentes

Este documento proporciona soluciones a los problemas más frecuentes que pueden surgir durante la creación y configuración de componentes en Angular.

## 🔍 Problemas con la generación de componentes

### 1. Error: "Cannot find module '@angular/core'"

**Problema:** 
```
Error: Cannot find module '@angular/core'
```

**Soluciones:**
- Verifica que estás dentro del directorio del proyecto Angular
- Asegúrate de que las dependencias estén instaladas:
  ```bash
  npm install
  ```
- Si el problema persiste, verifica la instalación de Angular CLI:
  ```bash
  ng version
  ```

### 2. Error: "More than one module matches"

**Problema:**
```
Error: More than one module matches. Use the '--skip-import' option to skip importing 
the component into the closest module or use the '--module' option to specify a module.
```

**Soluciones:**
- Especifica el módulo explícitamente:
  ```bash
  ng generate component my-component --module=app.module.ts
  ```
- O salta la importación automática:
  ```bash
  ng generate component my-component --skip-import
  ```

### 3. Error: "Declaration expected"

**Problema:** Error de sintaxis al crear un componente manualmente.

**Soluciones:**
- Verifica que la sintaxis del decorador `@Component` sea correcta
- Asegúrate de tener todas las llaves y paréntesis cerrados
- Comprueba que todas las propiedades dentro del decorador estén correctamente formateadas:
  ```typescript
  @Component({
    selector: 'app-example',
    templateUrl: './example.component.html',
    styleUrls: ['./example.component.css']
  })
  ```

## 🧩 Problemas con los selectores de componentes

### 1. Error: "Template parse errors: 'app-component' is not a known element"

**Problema:** El componente no es reconocido en la plantilla.

**Soluciones:**
- Verifica que el componente esté declarado en el módulo:
  ```typescript
  @NgModule({
    declarations: [
      AppComponent,
      MyNewComponent  // Asegúrate de que esté aquí
    ],
    // ...
  })
  ```
- Comprueba que el nombre del selector coincida exactamente con el usado en la plantilla
- Si el componente está en otro módulo, asegúrate de que ese módulo sea importado:
  ```typescript
  @NgModule({
    imports: [
      SharedModule  // El módulo que contiene el componente
    ],
    // ...
  })
  ```

### 2. Error: "Selector already exists"

**Problema:** Intentas usar un selector que ya existe en la aplicación.

**Solución:**
- Cambia el selector a uno único:
  ```typescript
  @Component({
    selector: 'app-unique-name',  // Cambia a un nombre único
    // ...
  })
  ```

## 📝 Problemas con templates y estilos

### 1. Error: "Cannot find template file"

**Problema:**
```
Error: Cannot find template file './my-component.component.html'
```

**Soluciones:**
- Verifica que la ruta al archivo de plantilla sea correcta
- Asegúrate de que el archivo exista en la ubicación especificada
- Considera usar una plantilla en línea si el archivo no existe:
  ```typescript
  @Component({
    selector: 'app-my-component',
    template: '<div>Template en línea</div>',  // En lugar de templateUrl
    // ...
  })
  ```

### 2. Error: "Cannot find stylesheet file"

**Problema:**
```
Error: Cannot find stylesheet file './my-component.component.css'
```

**Soluciones:**
- Verifica que la ruta al archivo de estilos sea correcta
- Asegúrate de que el archivo exista
- Usa estilos en línea o deja el array vacío:
  ```typescript
  @Component({
    selector: 'app-my-component',
    templateUrl: './my-component.component.html',
    styles: []  // En lugar de styleUrls
  })
  ```

### 3. Error: "Unexpected value 'undefined' imported by the module"

**Problema:** Se está intentando declarar un componente no definido en un módulo.

**Soluciones:**
- Verifica que el componente esté correctamente importado:
  ```typescript
  import { MyComponentComponent } from './my-component/my-component.component';
  ```
- Comprueba que el nombre de la clase coincida con lo que estás importando
- Asegúrate de que el archivo del componente exista y no tenga errores

## 🔄 Problemas con el ciclo de vida de componentes

### 1. Error: "Cannot read property of undefined"

**Problema:** Se intenta acceder a una propiedad antes de su inicialización.

**Soluciones:**
- Inicializa las propiedades en la declaración:
  ```typescript
  users: User[] = [];  // En lugar de users: User[];
  ```
- Usa el operador de encadenamiento opcional (`?.`):
  ```html
  <div>{{ user?.name }}</div>
  ```
- Usa `*ngIf` para renderizado condicional:
  ```html
  <div *ngIf="user">{{ user.name }}</div>
  ```

### 2. Error: "ExpressionChangedAfterItHasBeenCheckedError"

**Problema:** Se modifica un valor después de que Angular haya realizado la detección de cambios.

**Soluciones:**
- Mueve la lógica al método `ngAfterViewInit()` con `setTimeout`:
  ```typescript
  ngAfterViewInit() {
    setTimeout(() => {
      this.property = newValue;
    });
  }
  ```
- Usa `ChangeDetectorRef` para forzar una detección adicional:
  ```typescript
  constructor(private cd: ChangeDetectorRef) {}
  
  ngAfterViewInit() {
    this.property = newValue;
    this.cd.detectChanges();
  }
  ```

## 📊 Problemas con entradas y salidas (@Input/@Output)

### 1. Error: "Can't bind to 'property' since it isn't a known property"

**Problema:** Intentas vincular a una propiedad de entrada no definida.

**Soluciones:**
- Asegúrate de declarar la propiedad con `@Input()`:
  ```typescript
  @Input() property: string;
  ```
- Verifica que el componente esté declarado en el módulo correcto
- Comprueba la ortografía de la propiedad en la vinculación

### 2. Error: "No provider for Service"

**Problema:** Se intenta inyectar un servicio que no está disponible.

**Soluciones:**
- Proporciona el servicio en el módulo:
  ```typescript
  @NgModule({
    providers: [MyService]
  })
  ```
- O proporciona el servicio a nivel raíz:
  ```typescript
  @Injectable({
    providedIn: 'root'
  })
  ```

## 🎨 Problemas con estilos y encapsulación

### 1. Problema: "Los estilos no se aplican como se esperaba"

**Soluciones:**
- Verifica la encapsulación de vistas:
  ```typescript
  @Component({
    // ...
    encapsulation: ViewEncapsulation.Emulated  // Por defecto
  })
  ```
- Usa el atributo `:host` para aplicar estilos al componente:
  ```css
  :host {
    display: block;
    margin: 10px;
  }
  ```
- Para estilos globales, considera usar `ViewEncapsulation.None` o colócalos en `styles.css`

### 2. Problema: "Los estilos de componentes anidados no funcionan"

**Soluciones:**
- Usa `:host ::ng-deep` para afectar a componentes hijos (con precaución):
  ```css
  :host ::ng-deep .child-element {
    color: red;
  }
  ```
- Considera pasar una clase como `@Input()` al componente hijo:
  ```html
  <app-child [className]="'special-style'"></app-child>
  ```
- Utiliza variables CSS para compartir valores de estilo:
  ```css
  :host {
    --primary-color: blue;
  }
  ```

## 🧪 Problemas con testing de componentes

### 1. Error: "No component factory found"

**Problema:**
```
Error: No component factory found for ComponentName
```

**Soluciones:**
- Asegúrate de que el componente esté declarado en el TestBed:
  ```typescript
  TestBed.configureTestingModule({
    declarations: [MyComponent]
  });
  ```
- Si el componente usa otros componentes, declara o crea stubs para ellos:
  ```typescript
  @Component({
    selector: 'app-child',
    template: ''
  })
  class MockChildComponent {}
  
  TestBed.configureTestingModule({
    declarations: [MyComponent, MockChildComponent]
  });
  ```

### 2. Error: "Timeout - Async callback was not invoked within timeout"

**Problema:** Las pruebas asíncronas no se completan a tiempo.

**Soluciones:**
- Usa `async/await` con `fixture.whenStable()`:
  ```typescript
  it('should load data', async () => {
    component.loadData();
    await fixture.whenStable();
    expect(component.data).toBeTruthy();
  });
  ```
- Usa `fakeAsync` y `tick`:
  ```typescript
  it('should load data', fakeAsync(() => {
    component.loadData();
    tick();
    expect(component.data).toBeTruthy();
  }));
  ```

## 📝 Lista de verificación para solución de problemas

Cuando encuentres problemas con un componente, verifica:

1. **Estructura del componente**
   - ¿Está el decorador `@Component` correctamente aplicado?
   - ¿Los nombres de archivo siguen la convención de Angular?
   - ¿Las rutas a los archivos de plantilla y estilos son correctas?

2. **Módulos y declaraciones**
   - ¿Está el componente declarado en un módulo?
   - ¿Se ha importado correctamente el componente en el módulo?
   - Si se usa en otro módulo, ¿está exportado y el módulo importado?

3. **Propiedades de entrada/salida**
   - ¿Las propiedades `@Input()` están correctamente definidas?
   - ¿Los `@Output()` son instancias de `EventEmitter`?
   - ¿Los nombres de las propiedades coinciden en el template y la clase?

4. **Ciclo de vida**
   - ¿Se implementan correctamente las interfaces del ciclo de vida?
   - ¿Las operaciones pesadas se realizan en el hook adecuado?
   - ¿Se están evitando cambios después de la detección?

5. **Servicios e inyección**
   - ¿Los servicios están correctamente proporcionados?
   - ¿Las dependencias están correctamente inyectadas en el constructor?
   - ¿Se manejan adecuadamente los valores nulos o indefinidos?

## 💡 Consejos generales

1. **Usa el flag `--dry-run`** para ver qué cambios haría un comando sin realizarlos:
   ```bash
   ng generate component my-component --dry-run
   ```

2. **Revisa la consola del navegador** para errores de JavaScript o Angular

3. **Inspecciona el DOM** para verificar si los componentes se renderizan correctamente

4. **Utiliza `ng lint`** para detectar problemas de código:
   ```bash
   ng lint
   ```

5. **Para errores complejos, regenera el componente** y copia tu lógica paso a paso

6. **Mantén Angular y sus dependencias actualizadas** para evitar problemas de compatibilidad:
   ```bash
   ng update
   ```
