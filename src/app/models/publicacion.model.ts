// Agregue el modelo para definir los tipos de datos de una publicación
export interface Publicacion {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: Date;
  foto?: string;
}
