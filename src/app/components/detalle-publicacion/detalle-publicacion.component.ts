import { Component, Input, Output, EventEmitter } from '@angular/core';
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

// Este componente muestra el detalle de una publicación
@Component({
  selector: 'app-detalle-publicacion',
  templateUrl: './detalle-publicacion.component.html',
  styleUrls: ['./detalle-publicacion.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonItem,
    IonThumbnail,
    IonImg,
    IonLabel,
    IonButton,
    IonIcon,
  ],
})
export class DetallePublicacionComponent {
  // Con el input recibo la publicación a mostrar
  @Input() publicacion!: Publicacion;
  // Con el output emito el evento de eliminar la publicación
  @Output() eliminar = new EventEmitter<number>();

  constructor() {
    // Agrego el ícono de eliminar
    addIcons({ trash });
  }

  // Con este método emito el evento de eliminar la publicación con el id
  eliminarPublicacion() {
    this.eliminar.emit(this.publicacion.id);
  }
}
