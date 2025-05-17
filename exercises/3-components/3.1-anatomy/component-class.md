# La Clase del Componente en Angular

La clase del componente contiene la lógica que respalda a una vista. Es una clase TypeScript normal que Angular instancia y gestiona durante el ciclo de vida de la aplicación.

## 🧩 Estructura básica de una clase de componente

```typescript
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  // Propiedades
  users: User[] = [];
  selectedUser: User | null = null;
  isLoading = true;
  
  // Constructor para inyección de dependencias
  constructor(private userService: UserService) { }
  
  // Métodos de ciclo de vida
  ngOnInit(): void {
    this.loadUsers();
  }
  
  // Métodos personalizados
  loadUsers(): void {
    this.userService.getUsers()
      .subscribe(data => {
        this.users = data;
        this.isLoading = false;
      });
  }
  
  selectUser(user: User): void {
    this.selectedUser = user;
  }
}
```

## 📋 Elementos de una clase de componente

### 1. Propiedades

Las propiedades almacenan el estado y los datos del componente.

```typescript
export class ProductListComponent {
  // Propiedades públicas (accesibles desde el template)
  title = 'Lista de Productos';
  products: Product[] = [];
  selectedProduct: Product | null = null;
  
  // Propiedades privadas (solo accesibles dentro de la clase)
  private _apiUrl = 'https://api.example.com/products';
  private _sortOrder = 'asc';
  
  // Getters y setters
  get sortOrder(): string {
    return this._sortOrder;
  }
  
  set sortOrder(value: string) {
    if (value === 'asc' || value === 'desc') {
      this._sortOrder = value;
      this.sortProducts();
    }
  }
}
```

### 2. Constructor

El constructor se ejecuta cuando Angular crea el componente y se usa principalmente para la inyección de dependencias.

```typescript
export class UserProfileComponent {
  constructor(
    private userService: UserService,
    private router: Router,
    @Inject(CONFIG_TOKEN) private config: AppConfig
  ) {
    // Evita lógica compleja aquí, úsalo principalmente para inyección
  }
}
```

### 3. Métodos de ciclo de vida

Angular llama a estos métodos en momentos específicos del ciclo de vida de un componente.

```typescript
export class DataComponent implements OnInit, OnChanges, OnDestroy {
  @Input() dataId!: string;
  
  ngOnInit(): void {
    // Se llama después de que Angular haya inicializado
    // todas las propiedades enlazadas del componente
    console.log('Componente inicializado');
    this.loadData();
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    // Se llama cuando cambia una propiedad @Input
    if (changes['dataId']) {
      console.log(`dataId cambió de ${changes['dataId'].previousValue} a ${changes['dataId'].currentValue}`);
      this.loadData();
    }
  }
  
  ngOnDestroy(): void {
    // Se llama justo antes de que Angular destruya el componente
    console.log('Componente destruido');
    this.unsubscribe();
  }
}
```

### 4. Métodos personalizados

Métodos que definen el comportamiento y las acciones del componente.

```typescript
export class ShoppingCartComponent {
  items: CartItem[] = [];
  
  addToCart(product: Product, quantity: number = 1): void {
    const existingItem = this.items.find(item => item.productId === product.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity
      });
    }
    
    this.calculateTotal();
  }
  
  removeItem(index: number): void {
    this.items.splice(index, 1);
    this.calculateTotal();
  }
  
  private calculateTotal(): number {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
}
```

## 🔄 Comunicación entre componentes

### Input y Output

```typescript
import { Component, Input, Output, EventEmitter } from '@angular/core';

export class ProductCardComponent {
  // Propiedades de entrada (@Input)
  @Input() product!: Product;
  @Input() showDetails = false;
  
  // Eventos de salida (@Output)
  @Output() addToCart = new EventEmitter<Product>();
  @Output() productSelected = new EventEmitter<Product>();
  
  onAddToCartClicked(): void {
    this.addToCart.emit(this.product);
  }
  
  onProductClicked(): void {
    this.productSelected.emit(this.product);
  }
}
```

## 🧩 Gestión del estado y datos

### Propiedades derivadas y calculadas

```typescript
export class InvoiceComponent {
  items: InvoiceItem[] = [];
  taxRate = 0.21; // 21% IVA
  
  get subtotal(): number {
    return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }
  
  get taxAmount(): number {
    return this.subtotal * this.taxRate;
  }
  
  get total(): number {
    return this.subtotal + this.taxAmount;
  }
}
```

### Manejo de formularios

```typescript
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class RegisterFormComponent {
  registerForm: FormGroup;
  
  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }
  
  onSubmit(): void {
    if (this.registerForm.valid) {
      console.log('Formulario válido:', this.registerForm.value);
      // Enviar datos al servidor
    } else {
      this.markFormGroupTouched(this.registerForm);
    }
  }
  
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if ((control as FormGroup).controls) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
  }
}
```

## 🔍 ViewChild y ContentChild

Para acceder a elementos del DOM o componentes hijos.

```typescript
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ChartComponent } from 'some-chart-library';

export class DashboardComponent implements AfterViewInit {
  @ViewChild('videoPlayer') videoPlayer!: ElementRef;
  @ViewChild(ChartComponent) chart!: ChartComponent;
  
  ngAfterViewInit(): void {
    // Accediendo al elemento DOM nativo
    this.videoPlayer.nativeElement.play();
    
    // Accediendo a API de un componente hijo
    this.chart.refresh();
  }
  
  playVideo(): void {
    this.videoPlayer.nativeElement.play();
  }
  
  pauseVideo(): void {
    this.videoPlayer.nativeElement.pause();
  }
}
```

## 💡 Buenas prácticas para clases de componentes

1. **Single Responsibility Principle**: Cada componente debe tener una sola responsabilidad
2. **Mínima lógica en templates**: Mueve la lógica compleja a la clase del componente
3. **Componentes pequeños y enfocados**: Divide componentes grandes en más pequeños
4. **Encapsulación adecuada**: Usa modificadores de acceso (private, public) correctamente
5. **Destructores y limpieza**: Implementa ngOnDestroy para limpiar recursos (subscripciones, timers)
6. **Separación de intereses**: Extrae la lógica de negocio compleja a servicios

### Ejemplo de un componente bien estructurado

```typescript
import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../services/data.service';
import { LoggingService } from '../services/logging.service';

@Component({
  selector: 'app-data-display',
  templateUrl: './data-display.component.html',
  styleUrls: ['./data-display.component.css']
})
export class DataDisplayComponent implements OnInit, OnDestroy {
  // Inputs/Outputs bien definidos
  @Input() dataId!: string;
  @Input() refreshInterval = 60000; // 1 minuto por defecto
  @Output() dataLoaded = new EventEmitter<any>();
  
  // Estado del componente
  data: any[] = [];
  isLoading = true;
  hasError = false;
  errorMessage = '';
  
  // Propiedades privadas
  private refreshTimer?: number;
  private subscription = new Subscription();
  
  // Inyección de dependencias
  constructor(
    private dataService: DataService,
    private logger: LoggingService
  ) {}
  
  // Inicialización
  ngOnInit(): void {
    this.loadData();
    this.setupRefreshTimer();
  }
  
  // Limpieza
  ngOnDestroy(): void {
    this.clearRefreshTimer();
    this.subscription.unsubscribe();
    this.logger.log('DataDisplayComponent destroyed');
  }
  
  // Comportamiento público
  refresh(): void {
    this.isLoading = true;
    this.loadData();
  }
  
  // Métodos privados
  private loadData(): void {
    this.hasError = false;
    
    const dataSub = this.dataService.getData(this.dataId)
      .subscribe({
        next: (result) => {
          this.data = result;
          this.isLoading = false;
          this.dataLoaded.emit(result);
          this.logger.log('Data loaded successfully');
        },
        error: (error) => {
          this.hasError = true;
          this.errorMessage = error.message || 'Error loading data';
          this.isLoading = false;
          this.logger.error('Error loading data', error);
        }
      });
      
    this.subscription.add(dataSub);
  }
  
  private setupRefreshTimer(): void {
    if (this.refreshInterval > 0) {
      this.refreshTimer = window.setInterval(() => {
        this.loadData();
      }, this.refreshInterval);
    }
  }
  
  private clearRefreshTimer(): void {
    if (this.refreshTimer) {
      clearInterval(this.refreshTimer);
    }
  }
}
```

