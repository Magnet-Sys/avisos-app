import {
  Component,
  Input,
  Output,
  EventEmitter, // Clase para emitir eventos
  ViewChild, // Decorador para obtener referencias a elementos del DOM
  ElementRef, // Clase para obtener referencias a elementos del DOM
  AfterViewInit, // Interfaz para realizar acciones después de que la vista ha sido inicializada
  OnChanges, // Interfaz para reaccionar a cambios en las propiedades @Input
  SimpleChanges, // Clase para representar los cambios en las propiedades @Input
  ChangeDetectorRef, // Clase para forzar la detección de cambios en el DOM
} from '@angular/core';
import {
  IonItem,
  IonThumbnail,
  IonImg,
  IonLabel,
  IonButton,
  IonIcon,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { trash } from 'ionicons/icons';
import { Publicacion } from 'src/app/models/publicacion.model';
import { FormatoFechaPipe } from 'src/app/pipe/formato-fecha.pipe';

// Este componente muestra el detalle de una publicación
@Component({
  selector: 'app-detalle-publicacion',
  templateUrl: './detalle-publicacion.component.html',
  styleUrls: ['./detalle-publicacion.component.scss'],
  standalone: true,
  imports: [
    CommonModule, // Importa módulos necesarios
    IonItem,
    IonThumbnail,
    IonImg,
    IonLabel,
    IonButton,
    IonIcon,
    FormatoFechaPipe, // Pipe creado para formateo de fecha
  ],
})
export class DetallePublicacionComponent implements AfterViewInit, OnChanges {
  // Con el input recibo la publicación a mostrar desde el componente padre
  @Input() publicacion!: Publicacion;
  // Con el output emito el evento hacia el componente padre al eliminar una publicación
  @Output() eliminar = new EventEmitter<number>();
  // Se agrega decorador @ViewChild para acceder a elementos del DOM
  @ViewChild('expandableContent') expandableContent!: ElementRef; // Elemento para el contenido expandible
  @ViewChild('descripcionTexto') descripcionTexto!: ElementRef; // Elemento para la descripción de texto

  expanded = false; // Acá controlo si el contenido está expandido o no
  mostrarBoton = false; // acá controlo si se muestra el botón  de "Ver más"

  // Inyecto el servicio ChangeDetectorRef para controlar cambios en el DOM
  constructor(private cd: ChangeDetectorRef) {
    // Agrego el ícono de eliminar
    addIcons({ trash });
  }
  // Este método se ejecuta después de que la vista ha sido renderizada
  ngAfterViewInit() {
    // Esperar a que la vista se renderice para obtener las dimensiones correctas
    this.verificarTexto();
  }

  // Estse método se ejecuta cuando hay cambios en las propiedades @Input
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['publicacion']) {
      // Valido si la propiedad publicación cambió
      this.expanded = false; // Reiniciamos el estado de la expansión
      if (this.expandableContent) {
        // Verifico si el elemento expandableContent existe
        this.expandableContent.nativeElement.style.height = '30px'; // Ajusto la altura inicial
      }
      if (this.descripcionTexto) {
        // Verifico si el elemento descripcionTexto existe
        // Acá espero a que la vista actualice para verificar el texto
        setTimeout(() => {
          this.verificarTexto(); // Verifico si el texto es mayor al permitido
          this.cd.detectChanges(); // Acá se fuerza la detección de cambios
        }, 0);
      }
    }
  }

  // Con este método controlo la expansión del contenido
  toggleExpansion() {
    this.expanded = !this.expanded; // Cambio el estado de la expansión
    // Verifico si el contenido está expandido
    if (this.expanded) {
      this.expandableContent.nativeElement.style.height =
        this.descripcionTexto.nativeElement.scrollHeight + 'px'; // Se ajusta la altura
      this.expandableContent.nativeElement.classList.add('expanded'); // Agrego la clase para la expansión
    } else {
      this.expandableContent.nativeElement.style.height = '30px'; // Se ajusta la altura definida
      this.expandableContent.nativeElement.classList.remove('expanded'); // Ssaco la clase de expansión
    }
  }

  // Con este método emito el evento de eliminar la publicación con el id
  eliminarPublicacion() {
    this.eliminar.emit(this.publicacion.id);
  }

  verificarTexto() {
    // Agrego el texto en un setTimeout para esperar a que la vista se actualice
    setTimeout(() => {
      const alturaReal = this.descripcionTexto.nativeElement.scrollHeight; // Obtengo la altura real del texto
      this.mostrarBoton = alturaReal > 30; // Compruebo que el texto sea mayor y muestro el botón "Ver más"
      this.cd.detectChanges(); // Acá se fuerza la detección de cambios
    }, 0);
  }
}
