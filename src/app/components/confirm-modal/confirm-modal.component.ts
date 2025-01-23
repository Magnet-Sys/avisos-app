import { Component, Input } from '@angular/core';
import {
  ModalController,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonText,
} from '@ionic/angular/standalone';

// Este componente es el modal que confirma la eliminación de una publicación
@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
  standalone: true,
  imports: [IonText, IonHeader, IonToolbar, IonTitle, IonContent, IonButton],
})
export class ConfirmModalComponent {
  // Con el input recibo el mensaje a mostrar
  @Input() mensaje: string = '';

  constructor(private modalController: ModalController) {}

  // Con este método cierro el modal y emito si se confirmó o no la eliminación
  confirmar(confirmado: boolean) {
    // Cierro el modal y emito el resultado
    this.modalController.dismiss({ confirmado });
  }
}
