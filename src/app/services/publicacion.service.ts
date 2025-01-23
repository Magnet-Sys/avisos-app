import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Publicacion } from '../models/publicacion.model';

// Para lograr persistencia de datos en la aplicación, utilizo el plugin de Capacitor Preferences, el cual me permite almacenar datos en el dispositivo de manera persistente. Para ello, agregué la importación de Preferences desde @capacitor/preferences
@Injectable({
  // Esto hace que el servicio esté disponible en toda la aplicación
  providedIn: 'root',
})
// En este servicio "PublicacionService", defino los métodos necesarios para agregar, eliminar y obtener publicaciones
export class PublicacionService {
  // Defino una constante PREFIJO_DATOS que me permitirá identificar las claves de las publicaciones almacenadas en Preferences
  private readonly PREFIJO_DATOS = 'publicaciones-';

  constructor() {}

  // Método para obtener las publicaciones almacenadas en Preferences
  async obtenerPublicaciones(): Promise<Publicacion[]> {
    // Obtengo las claves almacenadas en Preferences
    const { keys } = await Preferences.keys();
    const publicaciones: Publicacion[] = [];
    // Recorro las claves almacenadas
    for (const key of keys) {
      if (key.startsWith(this.PREFIJO_DATOS)) {
        // Obtengo el valor de la clave y lo convierto a un objeto Publicacion
        const { value } = await Preferences.get({ key });
        // Si el valor existe, lo convierto a un objeto Publicacion y lo agrego al array de publicaciones
        if (value) {
          const publicacion: Publicacion = JSON.parse(value);
          // Convierto la fecha a un objeto Date
          console.log(
            'Valor de publicacion.fecha sin convertir:',
            publicacion.fecha
          );
          // Si la fecha es un string o un número, la convierto a un objeto Date
          if (typeof publicacion.fecha === 'string') {
            publicacion.fecha = new Date(publicacion.fecha);
          } else if (typeof publicacion.fecha === 'number') {
            // Si la fecha es un número, la convierto a un objeto Date
            publicacion.fecha = new Date(publicacion.fecha); //Asumiendo que es un timestamp
          }
          // Agrego la publicación al array de publicaciones
          publicaciones.push(publicacion);
        }
      }
    }
    // Ordeno las publicaciones por fecha de manera descendente
    return publicaciones.sort((a, b) => b.fecha.getTime() - a.fecha.getTime());
  }

  // Método para agregar una publicación
  async agregarPublicacion(publicacion: Publicacion): Promise<void> {
    // Genero un id único para la publicación
    const id = Date.now();
    // Asigno el id y la fecha actual a la publicación
    publicacion.id = id;
    // Convierto la fecha a un objeto Date
    publicacion.fecha = new Date();
    // Almaceno la publicación en Preferences
    await Preferences.set({
      key: `${this.PREFIJO_DATOS}${id}`,
      value: JSON.stringify(publicacion),
    });
  }

  // Método para eliminar una publicación
  async eliminarPublicacion(id: number): Promise<void> {
    // Elimino la publicación de Preferences
    await Preferences.remove({ key: `${this.PREFIJO_DATOS}${id}` });
  }

  // Método para obtener la fecha actual
  obtenerFechaActual(): Date {
    // Retorno la fecha actual
    return new Date();
  }
}
