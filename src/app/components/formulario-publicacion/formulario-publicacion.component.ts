import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { PublicacionService } from '../../services/publicacion.service';
import { Router, RouterModule } from '@angular/router';
// Se instala el paquete @capacitor/camera y se importa
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonButton,
  IonCard,
  IonImg,
  IonIcon,
  IonButtons,
  IonBackButton,
  IonText,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { camera, image } from 'ionicons/icons';

// Este componente es un formulario que permite al usuario crear una nueva publicación
@Component({
  selector: 'app-formulario-publicacion',
  templateUrl: './formulario-publicacion.component.html',
  styleUrls: ['./formulario-publicacion.component.scss'],
  standalone: true,
  imports: [
    IonText,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    IonButton,
    IonCard,
    IonImg,
    IonIcon,
    RouterModule,
    IonButtons,
    IonBackButton,
  ],
})
export class FormularioPublicacionComponent implements OnInit {
  // Se crea un formulario con los campos título y descripción
  formulario: FormGroup;
  // Se crea una variable para almacenar la foto que se toma o se selecciona de la galería
  foto: string | undefined;

  constructor(
    private fb: FormBuilder,
    private publicacionService: PublicacionService,
    private router: Router
  ) {
    // Se agregan los iconos de la cámara y la imagen
    addIcons({ camera, image });

    // Se inicializa el formulario con sus respectivas validaciones
    this.formulario = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(5)]],
      descripcion: ['', [Validators.required, Validators.minLength(20)]],
    });
  }

  ngOnInit() {}

  // Creo un método asincrónico para tomar una foto con la cámara
  async tomarFoto() {
    try {
      // Se utiliza el plugin Camera de Capacitor para tomar una foto.
      const image = await Camera.getPhoto({
        // Se configura la calidad de la imagen, si se permite editar y el tipo de resultado
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        // Acá se usa la cámara como fuente
        source: CameraSource.Camera,
      });

      // Se almacena la foto en la variable foto
      this.foto = image.dataUrl;

      // No quise ocupar base64, pero para crear la constante foto, seguí los pasos del vídeo de material de estudio, pero en vez de usar  resultType: CameraResultType.Base64, usé resultType: CameraResultType.DataUrl.
    } catch (error) {
      // Acá quise controlar el error, por si hay problemas con la foto y que se muestra en consola
      console.error('Error al tomar la foto:', error);
    }
  }

  // Creo un método asincrónico para seleccionar una foto de la galería del dispositivo
  async seleccionarFotoDeGaleria() {
    try {
      // Se utiliza el plugin Camera de Capacitor para seleccionar una foto de la galería
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        // Acá se usa la galería como fuente
        source: CameraSource.Photos,
      });
      // Se almacena la foto en la variable foto
      this.foto = image.dataUrl;
    } catch (error) {
      // Acá también quise controlar el error
      console.error('Error al seleccionar la foto de la galería:', error);
    }
  }

  // Método para guardar la publicación
  guardarPublicacion() {
    // Se valida si el formulario es válido
    if (this.formulario.valid) {
      // se crea un objeto con los datos del formulario
      const publicacion = {
        // aquí hice un destructuring, ya que quería agregar la fecha y la foto a la publicación
        ...this.formulario.value,
        // Se agrega la fecha actual de la publicación con el método obtenerFechaActual del servicio publicacionService
        fecha: this.publicacionService.obtenerFechaActual(),
        // se agrega la foto
        foto: this.foto,
      };

      // Agrego finalmente la publicación al servicio
      this.publicacionService.agregarPublicacion(publicacion).then(() => {
        // redirijo al usuario a la página principal
        this.router.navigate(['/']);
      });
    }
  }
}
