# Anatomía de un Componente en Angular

Los componentes son el bloque de construcción fundamental en aplicaciones Angular. Cada componente encapsula una porción de la interfaz de usuario, su comportamiento y su presentación, permitiendo crear interfaces modulares y reutilizables.

## 🎯 Objetivos de aprendizaje

En esta sección aprenderás:

- La estructura básica de un componente Angular
- Cómo configurar un componente usando el decorador @Component
- La sintaxis de las plantillas (templates) y su funcionamiento
- El papel de la clase del componente y su ciclo de vida
- Las opciones de metadatos disponibles para configurar componentes

## 📋 Contenido

1. [**component-decorator.md**](component-decorator.md) - Decorador @Component y sus metadatos
2. [**template-syntax.md**](template-syntax.md) - Sintaxis de templates y vinculación de datos
3. [**component-class.md**](component-class.md) - Estructura de la clase del componente
4. [**metadata.md**](metadata.md) - Opciones de configuración para componentes
5. [**HINTS.md**](HINTS.md) - Guía de implementación y buenas prácticas

## 🚀 Primeros pasos

1. Comienza entendiendo el decorador @Component en [component-decorator.md](component-decorator.md)
2. Explora la sintaxis de los templates en [template-syntax.md](template-syntax.md)
3. Conoce cómo funciona la clase del componente en [component-class.md](component-class.md)
4. Profundiza en las opciones de metadatos en [metadata.md](metadata.md)
5. Consulta guías y consejos prácticos en [HINTS.md](HINTS.md)

## 🧩 Estructura básica de un componente

Un componente en Angular se compone de tres partes principales:

```typescript
// Decorador @Component con metadatos
@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css']
})

// Clase del componente
export class ExampleComponent implements OnInit {
  // Propiedades
  title = 'Mi Componente';
  items = ['Item 1', 'Item 2', 'Item 3'];
  
  // Constructor
  constructor(private service: SomeService) { }
  
  // Métodos del ciclo de vida
  ngOnInit(): void {
    this.loadData();
  }
  
  // Métodos personalizados
  loadData(): void {
    // Lógica para cargar datos
  }
  
  handleClick(): void {
    // Manejar eventos
  }
}
```

Comprender estos elementos te permitirá crear componentes efectivos y mantener un código limpio, modular y reutilizable en tus aplicaciones Angular.

