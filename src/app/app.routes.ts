import { Routes } from '@angular/router';

// En este archivo se definen las rutas principales de la aplicación-->
export const routes: Routes = [
  {
    // Ruta raíz de la aplicación, la cual se redirige a la página de inicio (home)
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    // Ruta para la página de inicio
    path: 'home',
    // Se carga el componente HomePage de forma diferida (lazy loading)
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    // Ruta para crear una nueva publicación, en donde se carga el componente FormularioPublicacionComponent
    path: 'nueva-publicacion',
    // Se carga el componente FormularioPublicacionComponent de forma diferida (lazy loading)
    loadComponent: () =>
      import(
        './components/formulario-publicacion/formulario-publicacion.component'
      ).then((m) => m.FormularioPublicacionComponent),
  },
];
