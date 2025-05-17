# Mejores Prácticas para Jerarquía de Componentes

Este documento recopila las mejores prácticas, patrones y soluciones para gestionar eficientemente la jerarquía de componentes en Angular.

## 🧩 Patrones de diseño para la jerarquía de componentes

### 1. Patrón presentación-contenedor (Smart/Dumb Components)

Este patrón mejora la reutilización y el testing mediante la separación de responsabilidades:

#### Componentes contenedores (Smart)
- Gestionan el estado y la lógica de negocio
- Se conectan a servicios y fuentes de datos
- Pasan datos a los componentes de presentación
- Coordinan comportamientos complejos

```typescript
@Component({
  selector: 'app-user-dashboard',
  template: `
    <div class="dashboard">
      <app-user-header [user]="currentUser"></app-user-header>
      <app-user-details 
        [userDetails]="userDetails" 
        (updateRequest)="updateUserDetails($event)">
      </app-user-details>
      <app-user-activity [activities]="recentActivities"></app-user-activity>
    </div>
  `
})
export class UserDashboardComponent implements OnInit {
  currentUser: User;
  userDetails: UserDetails;
  recentActivities: Activity[];
  
  constructor(private userService: UserService) {}
  
  ngOnInit() {
    this.loadUserData();
  }
  
  loadUserData() {
    this.userService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
    });
    
    this.userService.getUserDetails().subscribe(details => {
      this.userDetails = details;
    });
    
    this.userService.getRecentActivities().subscribe(activities => {
      this.recentActivities = activities;
    });
  }
  
  updateUserDetails(details: UserDetails) {
    this.userService.updateDetails(details).subscribe(updatedDetails => {
      this.userDetails = updatedDetails;
    });
  }
}
```

#### Componentes de presentación (Dumb)
- Reciben datos a través de @Input
- Emiten eventos a través de @Output
- No tienen dependencias directas a servicios
- Enfocados en la presentación y la interacción del usuario

```typescript
@Component({
  selector: 'app-user-details',
  template: `
    <div class="user-details">
      <h3>Detalles del Usuario</h3>
      <div class="detail-item">
        <span>Nombre:</span>
        <p>{{ userDetails.name }}</p>
      </div>
      <div class="detail-item">
        <span>Email:</span>
        <p>{{ userDetails.email }}</p>
      </div>
      <div class="detail-item">
        <span>Teléfono:</span>
        <p>{{ userDetails.phone }}</p>
      </div>
      <button (click)="onUpdateRequest()">Editar Detalles</button>
    </div>
  `,
  styles: [`/* Estilos... */`]
})
export class UserDetailsComponent {
  @Input() userDetails: UserDetails;
  @Output() updateRequest = new EventEmitter<void>();
  
  onUpdateRequest() {
    this.updateRequest.emit();
  }
}
```

**Ventajas de este patrón:**
- Mayor reutilización de componentes de presentación
- Pruebas unitarias más sencillas
- Separación clara de responsabilidades
- Mejora de rendimiento mediante estrategias de detección de cambios

### 2. Patrón de composición de componentes

Utiliza componentes pequeños y enfocados que pueden combinarse para crear interfaces complejas:

```typescript
// Button básico reutilizable
@Component({
  selector: 'app-button',
  template: `
    <button 
      [class]="'btn ' + (variant ? 'btn-' + variant : '')" 
      [disabled]="disabled"
      (click)="onClick()">
      <ng-content></ng-content>
    </button>
  `
})
export class ButtonComponent {
  @Input() variant: 'primary' | 'secondary' | 'danger';
  @Input() disabled = false;
  @Output() clicked = new EventEmitter<void>();
  
  onClick() {
    this.clicked.emit();
  }
}

// Componiendo en una interfaz más compleja
@Component({
  selector: 'app-user-actions',
  template: `
    <div class="action-panel">
      <app-button variant="primary" (clicked)="saveUser()">Guardar</app-button>
      <app-button variant="secondary" (clicked)="resetForm()">Reiniciar</app-button>
      <app-button variant="danger" [disabled]="!canDelete" (clicked)="deleteUser()">
        Eliminar
      </app-button>
    </div>
  `
})
export class UserActionsComponent {
  @Input() canDelete = false;
  @Output() save = new EventEmitter<void>();
  @Output() reset = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
  
  saveUser() { this.save.emit(); }
  resetForm() { this.reset.emit(); }
  deleteUser() { this.delete.emit(); }
}
```

## 🔄 Mejores prácticas para la comunicación entre componentes

### 1. Maneja variables intermedias para @Input con setters

```typescript
@Component({
  selector: 'app-product-card',
  template: `<div>{{ formattedPrice }}</div>`
})
export class ProductCardComponent {
  formattedPrice: string;
  
  private _price: number;
  
  @Input()
  set price(value: number) {
    this._price = value;
    this.formattedPrice = this.formatPrice(value);
  }
  
  get price(): number {
    return this._price;
  }
  
  private formatPrice(price: number): string {
    return `$${price.toFixed(2)}`;
  }
}
```

### 2. Utiliza alias para evitar colisiones de nombres

```typescript
@Component({
  selector: 'app-price-display',
  template: `<span [class]="cssClass">{{ value | currency }}</span>`
})
export class PriceDisplayComponent {
  @Input('value') value: number;
  @Input('class') cssClass: string;
}

// Uso:
// <app-price-display [value]="product.price" [class]="priceClass"></app-price-display>
```

### 3. Propaga eventos hacia arriba mediante la cadena de componentes

```typescript
// Componente nieto
@Component({
  selector: 'app-quantity-control',
  template: `
    <button (click)="decrement()">-</button>
    <span>{{ quantity }}</span>
    <button (click)="increment()">+</button>
  `
})
export class QuantityControlComponent {
  @Input() quantity = 1;
  @Output() quantityChange = new EventEmitter<number>();
  
  increment() {
    this.quantity++;
    this.quantityChange.emit(this.quantity);
  }
  
  decrement() {
    if (this.quantity > 1) {
      this.quantity--;
      this.quantityChange.emit(this.quantity);
    }
  }
}

// Componente hijo
@Component({
  selector: 'app-product-controls',
  template: `
    <div class="controls">
      <app-quantity-control 
        [quantity]="quantity" 
        (quantityChange)="onQuantityChange($event)">
      </app-quantity-control>
      <button (click)="addToCart()">Add to Cart</button>
    </div>
  `
})
export class ProductControlsComponent {
  @Input() quantity = 1;
  @Input() productId: string;
  @Output() addProduct = new EventEmitter<{id: string, quantity: number}>();
  @Output() quantityChange = new EventEmitter<number>();
  
  onQuantityChange(quantity: number) {
    this.quantity = quantity;
    this.quantityChange.emit(quantity);
  }
  
  addToCart() {
    this.addProduct.emit({
      id: this.productId,
      quantity: this.quantity
    });
  }
}

// Componente padre
@Component({
  selector: 'app-product-page',
  template: `
    <div class="product">
      <app-product-info [product]="product"></app-product-info>
      <app-product-controls 
        [quantity]="selectedQuantity"
        [productId]="product.id"
        (quantityChange)="onQuantityChange($event)"
        (addProduct)="onAddToCart($event)">
      </app-product-controls>
    </div>
  `
})
export class ProductPageComponent {
  product: Product;
  selectedQuantity = 1;
  
  onQuantityChange(quantity: number) {
    this.selectedQuantity = quantity;
  }
  
  onAddToCart(item: {id: string, quantity: number}) {
    // Añadir al carrito
  }
}
```

## 🎯 Patrones avanzados para jerarquía de componentes

### 1. Inyección de componentes padres en hijos

Permite a los componentes hijos acceder a su padre sin usar @Input/@Output:

```typescript
@Component({
  selector: 'app-tabs',
  template: `
    <div class="tabs">
      <div class="tab-headers">
        <div *ngFor="let tab of tabs"
             class="tab-header"
             [class.active]="tab.active"
             (click)="selectTab(tab)">
          {{ tab.title }}
        </div>
      </div>
      <div class="tab-content">
        <ng-content></ng-content>
      </div>
    </div>
  `
})
export class TabsComponent {
  tabs: TabComponent[] = [];
  
  registerTab(tab: TabComponent) {
    this.tabs.push(tab);
  }
  
  selectTab(selectedTab: TabComponent) {
    this.tabs.forEach(tab => {
      tab.active = (tab === selectedTab);
    });
  }
}

@Component({
  selector: 'app-tab',
  template: `
    <div *ngIf="active">
      <ng-content></ng-content>
    </div>
  `
})
export class TabComponent implements OnInit {
  @Input() title: string;
  @Input() active = false;
  
  constructor(@Optional() private tabsContainer: TabsComponent) {}
  
  ngOnInit() {
    if (this.tabsContainer) {
      this.tabsContainer.registerTab(this);
    }
  }
}
```

### 2. Patrón para elementos dinámicos

Gestiona componentes que aparecen y desaparecen dinámicamente en la interfaz:

```typescript
// Componente para mensajes toast
@Component({
  selector: 'app-toast',
  template: `
    <div class="toast" [class]="'toast-' + type" @fadeAnimation>
      <div class="toast-content">{{ message }}</div>
      <button class="close-btn" (click)="close()">×</button>
    </div>
  `,
  animations: [
    trigger('fadeAnimation', [
      state('void', style({ opacity: 0, transform: 'translateY(20px)' })),
      transition('void <=> *', animate('300ms ease-in-out'))
    ])
  ]
})
export class ToastComponent {
  @Input() message: string;
  @Input() type: 'success' | 'error' | 'info' = 'info';
  @Output() closed = new EventEmitter<void>();
  
  close() {
    this.closed.emit();
  }
}

// Contenedor de toasts
@Component({
  selector: 'app-toast-container',
  template: `
    <div class="toast-container">
      <app-toast
        *ngFor="let toast of toasts; trackBy: trackById"
        [message]="toast.message"
        [type]="toast.type"
        (closed)="removeToast(toast.id)">
      </app-toast>
    </div>
  `
})
export class ToastContainerComponent {
  toasts: Array<{ id: number, message: string, type: string }> = [];
  private nextId = 1;
  
  addToast(message: string, type: 'success' | 'error' | 'info' = 'info', duration = 3000) {
    const id = this.nextId++;
    this.toasts.push({ id, message, type });
    
    if (duration > 0) {
      setTimeout(() => this.removeToast(id), duration);
    }
  }
  
  removeToast(id: number) {
    this.toasts = this.toasts.filter(toast => toast.id !== id);
  }
  
  trackById(index: number, toast: any): number {
    return toast.id;
  }
}
```

## 🔍 Soluciones a problemas comunes

### 1. Problema: Ciclos de detección de cambios infinitos

**Síntoma:** Error "Expression has changed after it was checked" o navegador congelado.

**Solución:**
```typescript
// En lugar de modificar directamente propiedades en el ciclo de vida
ngAfterViewInit() {
  // ❌ Error potencial:
  this.someProperty = 'new value';
  
  // ✅ Solución:
  setTimeout(() => {
    this.someProperty = 'new value';
  });
}

// O usando ChangeDetectorRef
constructor(private cdRef: ChangeDetectorRef) {}

ngAfterViewInit() {
  this.someProperty = 'new value';
  this.cdRef.detectChanges();
}
```

### 2. Problema: Acceso prematuro a ViewChild

**Síntoma:** Error al intentar acceder a un ViewChild antes de que esté disponible.

**Solución:**
```typescript
@Component({
  selector: 'app-example',
  template: `
    <video #videoPlayer></video>
    <button (click)="playVideo()">Play</button>
  `
})
export class ExampleComponent implements AfterViewInit {
  @ViewChild('videoPlayer') videoPlayer: ElementRef<HTMLVideoElement>;
  
  // ❌ Error potencial:
  ngOnInit() {
    this.videoPlayer.nativeElement.play(); // Error: videoPlayer es undefined
  }
  
  // ✅ Solución:
  ngAfterViewInit() {
    // El ViewChild está disponible en este punto
  }
  
  playVideo() {
    if (this.videoPlayer) {
      this.videoPlayer.nativeElement.play();
    }
  }
}
```

### 3. Problema: Comunicación entre componentes no relacionados

**Síntoma:** Dificultad para comunicar componentes en diferentes ramas del árbol.

**Solución:** Utilizar un servicio como intermediario:

```typescript
// shared-data.service.ts
@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private messageSource = new BehaviorSubject<string>('');
  currentMessage = this.messageSource.asObservable();
  
  updateMessage(message: string) {
    this.messageSource.next(message);
  }
}

// sender.component.ts
@Component({
  selector: 'app-sender',
  template: `
    <input [(ngModel)]="message">
    <button (click)="sendMessage()">Send</button>
  `
})
export class SenderComponent {
  message: string;
  
  constructor(private dataService: SharedDataService) {}
  
  sendMessage() {
    this.dataService.updateMessage(this.message);
  }
}

// receiver.component.ts
@Component({
  selector: 'app-receiver',
  template: `<p>{{ receivedMessage }}</p>`
})
export class ReceiverComponent implements OnInit, OnDestroy {
  receivedMessage: string;
  private subscription: Subscription;
  
  constructor(private dataService: SharedDataService) {}
  
  ngOnInit() {
    this.subscription = this.dataService.currentMessage
      .subscribe(message => {
        this.receivedMessage = message;
      });
  }
  
  ngOnDestroy() {
    // Importante: siempre desuscribirse para evitar memory leaks
    this.subscription.unsubscribe();
  }
}
```

### 4. Problema: Componente hijo que necesita notificar al padre su inicialización

**Síntoma:** El componente padre necesita saber cuándo están listos sus hijos.

**Solución:**
```typescript
// child.component.ts
@Component({
  selector: 'app-child',
  template: `<div>Child component</div>`
})
export class ChildComponent implements AfterViewInit {
  @Output() initialized = new EventEmitter<void>();
  
  ngAfterViewInit() {
    this.initialized.emit();
  }
}

// parent.component.ts
@Component({
  selector: 'app-parent',
  template: `
    <app-child (initialized)="onChildInitialized()"></app-child>
  `
})
export class ParentComponent {
  onChildInitialized() {
    console.log('Child component is initialized');
    // Realizar acciones que dependen de la inicialización del hijo
  }
}
```

## 💡 Consejos para optimizar la estructura de componentes

### 1. Planifica la jerarquía de componentes

Antes de comenzar a implementar, diseña la estructura:

- **Identifica componentes compartidos** que se reutilizarán
- **Establece responsabilidades claras** para cada componente
- **Visualiza el flujo de datos** entre componentes
- **Considera el nivel de anidamiento** (evita anidamientos excesivos)

### 2. Optimiza el rendimiento con OnPush

```typescript
@Component({
  selector: 'app-data-display',
  template: `<div>{{ data | json }}</div>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataDisplayComponent {
  @Input() data: any;
}
```

Con OnPush, el componente solo se actualiza cuando:
- Cambia una referencia de entrada (@Input)
- Se dispara un evento dentro del componente
- Se ejecuta detectChanges() explícitamente
- Se utiliza async pipe en el template

### 3. Implementa ngOnChanges correctamente

```typescript
@Component({
  selector: 'app-user-profile',
  template: `<div>{{ fullName }}</div>`
})
export class UserProfileComponent implements OnChanges {
  @Input() firstName: string;
  @Input() lastName: string;
  fullName: string;
  
  ngOnChanges(changes: SimpleChanges) {
    // Verificar qué inputs han cambiado
    if (changes.firstName || changes.lastName) {
      this.updateFullName();
    }
    
    // Verificar si es el primer cambio
    if (changes.firstName && changes.firstName.firstChange) {
      console.log('Primera asignación de firstName');
    }
  }
  
  private updateFullName() {
    this.fullName = `${this.firstName || ''} ${this.lastName || ''}`.trim();
  }
}
```

### 4. Gestiona correctamente las suscripciones

```typescript
@Component({
  selector: 'app-data-container',
  template: `<app-data-view [data]="data"></app-data-view>`
})
export class DataContainerComponent implements OnInit, OnDestroy {
  data: any;
  private subscription = new Subscription(); // Contenedor para todas las suscripciones
  
  constructor(private dataService: DataService) {}
  
  ngOnInit() {
    // Agregar suscripciones al contenedor
    this.subscription.add(
      this.dataService.getData().subscribe(data => {
        this.data = data;
      })
    );
    
    this.subscription.add(
      this.dataService.getUpdates().subscribe(updates => {
        // Manejar actualizaciones
      })
    );
  }
  
  ngOnDestroy() {
    // Una sola llamada cancela todas las suscripciones
    this.subscription.unsubscribe();
  }
}
```

### 5. Utiliza trackBy para mejorar el rendimiento de ngFor

```typescript
@Component({
  selector: 'app-item-list',
  template: `
    <div *ngFor="let item of items; trackBy: trackByFn">
      {{ item.name }}
    </div>
  `
})
export class ItemListComponent {
  @Input() items: any[];
  
  trackByFn(index: number, item: any): number {
    return item.id; // Usar un identificador único y estable
  }
}
```

## 📊 Lista de verificación para componentes jerárquicos

✅ **Componentes claramente definidos**
- [ ] Cada componente tiene una responsabilidad única
- [ ] Los componentes son lo suficientemente pequeños para ser mantenibles
- [ ] Los componentes están debidamente documentados

✅ **Comunicación eficiente**
- [ ] @Input() y @Output() utilizados apropiadamente
- [ ] Servicios empleados para comunicación no relacionada
- [ ] Eventos personalizados bien definidos

✅ **Gestión del ciclo de vida**
- [ ] Implementación correcta de hooks del ciclo de vida
- [ ] Limpieza apropiada en ngOnDestroy
- [ ] Manejo adecuado de ViewChild y ContentChild

✅ **Rendimiento**
- [ ] Estrategia OnPush donde sea posible
- [ ] trackBy en directivas *ngFor
- [ ] Minimización de detección de cambios innecesaria

✅ **Reutilización**
- [ ] Componentes diseñados para ser reutilizables
- [ ] Uso de @Input() para configuración
- [ ] Personalización mediante ng-content cuando sea apropiado
