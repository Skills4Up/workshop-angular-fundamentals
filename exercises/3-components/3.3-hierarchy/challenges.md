# Ejercicios Prácticos de Jerarquía de Componentes

Estos ejercicios te ayudarán a practicar y comprender mejor cómo crear y gestionar jerarquías de componentes en Angular, incluyendo la comunicación entre componentes padres e hijos, proyección de contenido y optimización del árbol de componentes.

## 🎯 Reto 1: Sistema básico de tarjetas con componentes anidados

**Objetivo:** Implementar un sistema de tarjetas con componentes padres e hijos.

**Tareas:**
1. Crea un componente `CardComponent` que actúe como contenedor
2. Crea componentes hijos `CardHeaderComponent`, `CardBodyComponent` y `CardFooterComponent`
3. Implementa entradas para personalizar cada componente
4. Estructura los componentes para que funcionen juntos

**Generación de componentes:**
```bash
ng generate component shared/card
ng generate component shared/card/card-header
ng generate component shared/card/card-body
ng generate component shared/card/card-footer
```

**Estructura básica de los componentes:**

```typescript
// card.component.ts
@Component({
  selector: 'app-card',
  template: `
    <div class="card">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .card {
      border: 1px solid #ddd;
      border-radius: 4px;
      margin-bottom: 20px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
  `]
})
export class CardComponent {}

// card-header.component.ts
@Component({
  selector: 'app-card-header',
  template: `
    <div class="card-header" [class]="styleClass">
      <h3 *ngIf="title">{{ title }}</h3>
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .card-header {
      padding: 10px 15px;
      border-bottom: 1px solid #eee;
      background-color: #f8f9fa;
    }
    .primary { background-color: #007bff; color: white; }
    .success { background-color: #28a745; color: white; }
    .danger { background-color: #dc3545; color: white; }
  `]
})
export class CardHeaderComponent {
  @Input() title: string;
  @Input() styleClass: string;
}

// Implementa el resto de componentes de manera similar
```

**Uso del sistema de tarjetas:**
```html
<app-card>
  <app-card-header title="Información del usuario" styleClass="primary"></app-card-header>
  <app-card-body>
    <p>Nombre: John Doe</p>
    <p>Email: john@example.com</p>
  </app-card-body>
  <app-card-footer>
    <button>Ver detalles</button>
  </app-card-footer>
</app-card>
```

## 🎯 Reto 2: Comunicación bidireccional entre componentes

**Objetivo:** Implementar un sistema de contador con componentes que se comunican bidireccionalmente.

**Tareas:**
1. Crea un componente padre `CounterContainerComponent`
2. Crea un componente hijo `CounterDisplayComponent` para mostrar el valor
3. Crea un componente hijo `CounterControlsComponent` para los botones
4. Implementa comunicación desde el padre hacia ambos hijos
5. Implementa comunicación desde los hijos hacia el padre

**Generación de componentes:**
```bash
ng generate component features/counter/counter-container
ng generate component features/counter/counter-display
ng generate component features/counter/counter-controls
```

**Estructura básica:**

```typescript
// counter-container.component.ts
@Component({
  selector: 'app-counter-container',
  template: `
    <div class="counter-container">
      <h2>Contador: {{ count }}</h2>
      <app-counter-display [value]="count"></app-counter-display>
      <app-counter-controls 
        [count]="count"
        (increment)="incrementCount()"
        (decrement)="decrementCount()"
        (reset)="resetCount()">
      </app-counter-controls>
    </div>
  `
})
export class CounterContainerComponent {
  count = 0;
  
  incrementCount() {
    this.count++;
  }
  
  decrementCount() {
    if (this.count > 0) {
      this.count--;
    }
  }
  
  resetCount() {
    this.count = 0;
  }
}

// counter-display.component.ts
@Component({
  selector: 'app-counter-display',
  template: `
    <div class="counter-display" [ngClass]="getDisplayClass()">
      <h3>{{ value }}</h3>
    </div>
  `,
  styles: [`
    .counter-display {
      font-size: 24px;
      padding: 20px;
      border-radius: 50%;
      width: 100px;
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
    }
    .low { background-color: #f8d7da; }
    .medium { background-color: #fff3cd; }
    .high { background-color: #d4edda; }
  `]
})
export class CounterDisplayComponent {
  @Input() value: number;
  
  getDisplayClass() {
    if (this.value < 5) return 'low';
    if (this.value < 10) return 'medium';
    return 'high';
  }
}

// counter-controls.component.ts
@Component({
  selector: 'app-counter-controls',
  template: `
    <div class="counter-controls">
      <button (click)="onDecrement()" [disabled]="count <= 0">-</button>
      <button (click)="onReset()">Reset</button>
      <button (click)="onIncrement()">+</button>
    </div>
  `,
  styles: [`
    .counter-controls {
      display: flex;
      justify-content: center;
      gap: 10px;
      margin-top: 20px;
    }
    button {
      padding: 8px 16px;
      font-size: 16px;
      cursor: pointer;
    }
  `]
})
export class CounterControlsComponent {
  @Input() count: number;
  @Output() increment = new EventEmitter<void>();
  @Output() decrement = new EventEmitter<void>();
  @Output() reset = new EventEmitter<void>();
  
  onIncrement() {
    this.increment.emit();
  }
  
  onDecrement() {
    this.decrement.emit();
  }
  
  onReset() {
    this.reset.emit();
  }
}
```

## 🎯 Reto 3: Árbol de componentes con proyección de contenido

**Objetivo:** Crear un sistema de pestañas con contenido proyectado.

**Tareas:**
1. Crea un componente contenedor `TabsContainerComponent`
2. Crea un componente individual `TabComponent`
3. Implementa la selección de pestañas
4. Utiliza `ng-content` para proyectar el contenido de cada pestaña
5. Implementa un sistema donde las pestañas se comuniquen con su contenedor

**Generación de componentes:**
```bash
ng generate component shared/tabs/tabs-container
ng generate component shared/tabs/tab
```

**Estructura básica:**

```typescript
// tab.component.ts
@Component({
  selector: 'app-tab',
  template: `
    <div class="tab-content" [hidden]="!active">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .tab-content {
      padding: 15px;
      border: 1px solid #ddd;
      border-top: none;
      border-radius: 0 0 4px 4px;
    }
  `]
})
export class TabComponent implements OnInit {
  @Input() title: string;
  @Input() active = false;
  
  constructor(@Optional() private tabsContainer: TabsContainerComponent) {}
  
  ngOnInit() {
    if (this.tabsContainer) {
      this.tabsContainer.addTab(this);
    }
  }
}

// tabs-container.component.ts
@Component({
  selector: 'app-tabs-container',
  template: `
    <div class="tabs-container">
      <div class="tab-headers">
        <div 
          *ngFor="let tab of tabs" 
          class="tab-header" 
          [class.active]="tab.active"
          (click)="selectTab(tab)">
          {{ tab.title }}
        </div>
      </div>
      <div class="tab-body">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [`
    .tab-headers {
      display: flex;
      border-bottom: 1px solid #ddd;
    }
    .tab-header {
      padding: 10px 15px;
      cursor: pointer;
      border: 1px solid transparent;
      border-radius: 4px 4px 0 0;
      margin-bottom: -1px;
    }
    .tab-header.active {
      border: 1px solid #ddd;
      border-bottom-color: white;
      background-color: white;
    }
  `]
})
export class TabsContainerComponent implements AfterContentInit {
  tabs: TabComponent[] = [];
  
  addTab(tab: TabComponent) {
    this.tabs.push(tab);
  }
  
  selectTab(selectedTab: TabComponent) {
    this.tabs.forEach(tab => {
      tab.active = (tab === selectedTab);
    });
  }
  
  ngAfterContentInit() {
    // Activar la primera pestaña por defecto si ninguna está activa
    if (this.tabs.length && !this.tabs.find(tab => tab.active)) {
      this.selectTab(this.tabs[0]);
    }
  }
}
```

**Uso del sistema de pestañas:**
```html
<app-tabs-container>
  <app-tab title="Información Personal">
    <h3>Información Personal</h3>
    <p>Aquí va la información personal del usuario.</p>
  </app-tab>
  <app-tab title="Historial" [active]="true">
    <h3>Historial de Actividad</h3>
    <ul>
      <li>Actividad 1</li>
      <li>Actividad 2</li>
      <li>Actividad 3</li>
    </ul>
  </app-tab>
  <app-tab title="Configuración">
    <h3>Configuración de la Cuenta</h3>
    <form>
      <!-- Formulario de configuración -->
    </form>
  </app-tab>
</app-tabs-container>
```

## 🎯 Reto 4: Componente padre con acceso a métodos de hijos

**Objetivo:** Implementar un reproductor de medios donde el componente padre pueda controlar las acciones de sus hijos.

**Tareas:**
1. Crea un componente padre `MediaPlayerComponent`
2. Crea componentes hijos `VideoPlayerComponent` y `AudioPlayerComponent`
3. Implementa métodos en los hijos para controlar reproducción
4. Utiliza `@ViewChild` en el padre para acceder a estos métodos
5. Crea una interfaz común para ambos tipos de reproductores

**Generación de componentes:**
```bash
ng generate component features/media-player/media-player
ng generate component features/media-player/video-player
ng generate component features/media-player/audio-player
```

**Estructura básica:**

```typescript
// player.interface.ts
export interface Player {
  play(): void;
  pause(): void;
  stop(): void;
  setVolume(volume: number): void;
  getStatus(): string;
}

// video-player.component.ts
@Component({
  selector: 'app-video-player',
  template: `
    <div class="video-player">
      <video #videoElement width="100%" [src]="source" [controls]="showControls"></video>
      <div *ngIf="!showControls" class="custom-controls">
        <span>Status: {{ getStatus() }}</span>
      </div>
    </div>
  `
})
export class VideoPlayerComponent implements Player, AfterViewInit {
  @Input() source: string;
  @Input() showControls = true;
  @ViewChild('videoElement') videoElement: ElementRef<HTMLVideoElement>;
  
  private video: HTMLVideoElement;
  
  ngAfterViewInit() {
    this.video = this.videoElement.nativeElement;
  }
  
  play() {
    this.video.play();
  }
  
  pause() {
    this.video.pause();
  }
  
  stop() {
    this.video.pause();
    this.video.currentTime = 0;
  }
  
  setVolume(volume: number) {
    this.video.volume = Math.max(0, Math.min(1, volume));
  }
  
  getStatus(): string {
    if (!this.video) return 'Loading';
    return this.video.paused ? 'Paused' : 'Playing';
  }
}

// Implementa AudioPlayerComponent de manera similar

// media-player.component.ts
@Component({
  selector: 'app-media-player',
  template: `
    <div class="media-player">
      <h2>Media Player</h2>
      
      <div class="controls">
        <button (click)="playMedia()">Play</button>
        <button (click)="pauseMedia()">Pause</button>
        <button (click)="stopMedia()">Stop</button>
        <input type="range" min="0" max="100" [value]="volume" 
               (input)="setVolume($event)">
      </div>
      
      <div class="player-container">
        <app-video-player 
          *ngIf="mediaType === 'video'"
          [source]="mediaSource"
          [showControls]="false">
        </app-video-player>
        
        <app-audio-player 
          *ngIf="mediaType === 'audio'"
          [source]="mediaSource"
          [showControls]="false">
        </app-audio-player>
      </div>
      
      <div class="media-selector">
        <button (click)="selectMedia('video', '/assets/sample-video.mp4')">Video</button>
        <button (click)="selectMedia('audio', '/assets/sample-audio.mp3')">Audio</button>
      </div>
    </div>
  `
})
export class MediaPlayerComponent {
  @ViewChild(VideoPlayerComponent) videoPlayer: VideoPlayerComponent;
  @ViewChild(AudioPlayerComponent) audioPlayer: AudioPlayerComponent;
  
  mediaType: 'video' | 'audio' = 'video';
  mediaSource = '/assets/sample-video.mp4';
  volume = 50;
  
  selectMedia(type: 'video' | 'audio', source: string) {
    this.mediaType = type;
    this.mediaSource = source;
  }
  
  private getActivePlayer(): Player {
    return this.mediaType === 'video' ? this.videoPlayer : this.audioPlayer;
  }
  
  playMedia() {
    const player = this.getActivePlayer();
    if (player) player.play();
  }
  
  pauseMedia() {
    const player = this.getActivePlayer();
    if (player) player.pause();
  }
  
  stopMedia() {
    const player = this.getActivePlayer();
    if (player) player.stop();
  }
  
  setVolume(event: any) {
    this.volume = event.target.value;
    const volume = this.volume / 100;
    const player = this.getActivePlayer();
    if (player) player.setVolume(volume);
  }
}
```

## 🎯 Reto 5: Sistema de dashboard con componentes dinámicos

**Objetivo:** Crear un dashboard donde los widgets se puedan añadir, eliminar y reordenar.

**Tareas:**
1. Crea un componente `DashboardComponent` que actúe como contenedor
2. Implementa múltiples componentes de tipo widget
3. Permite añadir y eliminar widgets dinámicamente
4. Implementa comunicación desde los widgets al dashboard
5. Usa `*ngFor` con `trackBy` para optimizar el renderizado

**Estructura básica:**

```typescript
// widget.interface.ts
export interface Widget {
  id: number;
  title: string;
  type: string;
  data?: any;
}

// dashboard.component.ts
@Component({
  selector: 'app-dashboard',
  template: `
    <div class="dashboard">
      <h2>Panel de Control</h2>
      
      <div class="widget-controls">
        <button (click)="addWidget('chart')">Añadir Gráfico</button>
        <button (click)="addWidget('stats')">Añadir Estadísticas</button>
        <button (click)="addWidget('list')">Añadir Lista</button>
      </div>
      
      <div class="widgets-container">
        <ng-container *ngFor="let widget of widgets; trackBy: trackByWidgetId">
          <app-chart-widget 
            *ngIf="widget.type === 'chart'"
            [widget]="widget"
            (close)="removeWidget(widget.id)">
          </app-chart-widget>
          
          <app-stats-widget 
            *ngIf="widget.type === 'stats'"
            [widget]="widget"
            (close)="removeWidget(widget.id)">
          </app-stats-widget>
          
          <app-list-widget 
            *ngIf="widget.type === 'list'"
            [widget]="widget"
            (close)="removeWidget(widget.id)">
          </app-list-widget>
        </ng-container>
        
        <p *ngIf="widgets.length === 0" class="no-widgets">
          No hay widgets añadidos. Añade algunos usando los botones de arriba.
        </p>
      </div>
    </div>
  `,
  styles: [`
    .widgets-container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }
    .widget-controls {
      margin-bottom: 20px;
    }
    .no-widgets {
      grid-column: 1 / -1;
      text-align: center;
      padding: 30px;
      background-color: #f8f9fa;
      border-radius: 4px;
    }
  `]
})
export class DashboardComponent {
  widgets: Widget[] = [];
  nextId = 1;
  
  addWidget(type: string) {
    const newWidget: Widget = {
      id: this.nextId++,
      title: this.getWidgetTitle(type),
      type,
      data: this.generateRandomData(type)
    };
    
    this.widgets = [...this.widgets, newWidget];
  }
  
  removeWidget(id: number) {
    this.widgets = this.widgets.filter(widget => widget.id !== id);
  }
  
  trackByWidgetId(index: number, widget: Widget): number {
    return widget.id;
  }
  
  private getWidgetTitle(type: string): string {
    switch (type) {
      case 'chart': return 'Gráfico de Datos';
      case 'stats': return 'Estadísticas';
      case 'list': return 'Lista de Elementos';
      default: return 'Widget';
    }
  }
  
  private generateRandomData(type: string): any {
    // Generar datos aleatorios según el tipo de widget
    // ...
  }
}

// Implementa los componentes de widgets con una estructura consistente:
@Component({
  selector: 'app-chart-widget',
  template: `
    <div class="widget">
      <div class="widget-header">
        <h3>{{ widget.title }}</h3>
        <button class="close-btn" (click)="onClose()">×</button>
      </div>
      <div class="widget-content">
        <!-- Contenido específico del tipo de widget -->
      </div>
    </div>
  `,
  styles: [`
    .widget {
      border: 1px solid #ddd;
      border-radius: 4px;
      overflow: hidden;
    }
    .widget-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 15px;
      background-color: #f8f9fa;
      border-bottom: 1px solid #ddd;
    }
    .close-btn {
      background: none;
      border: none;
      font-size: 20px;
      cursor: pointer;
    }
    .widget-content {
      padding: 15px;
    }
  `]
})
export class ChartWidgetComponent {
  @Input() widget: Widget;
  @Output() close = new EventEmitter<void>();
  
  onClose() {
    this.close.emit();
  }
}
```

## 🔍 Verificación y depuración

Para cada ejercicio, verifica:

1. **La estructura de componentes**: Asegúrate de que la jerarquía funcione como esperabas
2. **La comunicación entre componentes**: Verifica que padres e hijos se comuniquen correctamente
3. **El ciclo de vida**: Asegúrate de que los hooks del ciclo de vida se implementen adecuadamente
4. **El rendimiento**: Verifica que no haya problemas de rendimiento con `ngFor` o detección de cambios
5. **La proyección de contenido**: Asegúrate de que `ng-content` funcione correctamente

Utiliza las herramientas de desarrollo de Angular para observar el árbol de componentes y su estado:
- Angular DevTools (extensión para navegadores)
- Consola del navegador para mensajes de depuración
- Augury (aunque está siendo reemplazado por Angular DevTools)

