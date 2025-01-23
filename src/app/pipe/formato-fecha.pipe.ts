import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

// Acá creo un pipe personalizado para formatear fecha de las publicaciones
@Pipe({
  name: 'formatoFecha',
  standalone: true,
})
export class FormatoFechaPipe implements PipeTransform {
  // Método que recibe una fecha y la formatea en el formato dd/MM/yyyy HH:mm
  transform(value: any, format?: string): string | null {
    // Si no hay valor, retorno null
    if (!value) return null;

    // Creo un DatePipe con el idioma local es-CL
    const datePipe = new DatePipe('es-CL');
    // Retorno la fecha formateada
    return datePipe.transform(value, format || 'dd/MM/yyyy HH:mm');
  }
}
