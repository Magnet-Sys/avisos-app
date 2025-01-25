import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonFab,
  IonFabButton,
  IonIcon,
  ModalController,
  IonText,
  IonCard,
  IonCardContent,
} from '@ionic/angular/standalone';
// Importo el servicio PublicacionService
import { PublicacionService } from '../services/publicacion.service';
import { Router, RouterModule } from '@angular/router';
// Agrego la importacóin del componente DetallePublicacionComponent para poder usarlo
import { DetallePublicacionComponent } from '../components/detalle-publicacion/detalle-publicacion.component';
// Importo el componente ConfirmModalComponent para poder eliminar una publicación
import { ConfirmModalComponent } from '../components/confirm-modal/confirm-modal.component';
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';
// Importo el modelo Publicacion para definir el tipo de dato de la variable publicaciones
import { Publicacion } from '../models/publicacion.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonCardContent,
    IonCard,
    IonText,
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonFab,
    IonFabButton,
    IonIcon,
    RouterModule,
    DetallePublicacionComponent,
  ],
})

// Esta es la clase que representa la página de inicio de la aplicación
export class HomePage implements OnInit {
  // Defino la variable publicaciones como un array en donde le asigno el tipo de dato Publicacion
  publicaciones: Publicacion[] = [];

  // En el constructor inyecto el servicio PublicacionService y el router, además de ModalController
  constructor(
    private publicacionService: PublicacionService,
    private router: Router,
    private modalController: ModalController
  ) {
    // Agrego los iconos que voy a usar
    addIcons({ add });
  }

  // Se ejecuta al iniciar la página
  async ngOnInit() {
    // Cargo las publicaciones al iniciar
    await this.cargarPublicaciones();
  }

  // Este método carga las publicaciones desde el servicio PublicacionService
  async cargarPublicaciones() {
    this.publicaciones = await this.publicacionService.obtenerPublicaciones();
  }

  // Este método navega a la página de creación de publicación
  navegarAFormulario() {
    this.router.navigate(['/nueva-publicacion']);
  }

  // Acá abro el modal para confirmar la eliminación de una publicación
  async confirmarEliminacion(id: number) {
    // Creo el modal de confirmacóin
    const modal = await this.modalController.create({
      component: ConfirmModalComponent,
      componentProps: {
        mensaje: '¿Estás seguro de que quieres eliminar esta publicación?',
      },
    });
    // Muestro el modal
    await modal.present();
    // Espero a que se cierre el modal para obtener la respuesta
    const { data } = await modal.onDidDismiss();
    // Si la respuesta es true, elimino la publicación
    if (data && data.confirmado) {
      this.eliminarPublicacion(id);
    }
  }

  // Este método elimina una publicación por su id y luego recarga las publicaciones
  async eliminarPublicacion(id: number) {
    await this.publicacionService.eliminarPublicacion(id);
    // Recargo las publicaciones
    await this.cargarPublicaciones();
  }
  // Este método abre el modal de detalle de publicación
  ionViewWillEnter() {
    // Recargo las publicaciones al volver a la página
    this.cargarPublicaciones();
  }
}
