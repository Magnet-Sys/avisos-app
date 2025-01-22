import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'nueva-publicacion',
    loadComponent: () =>
      import(
        './components/formulario-publicacion/formulario-publicacion.component'
      ).then((m) => m.FormularioPublicacionComponent),
  },
];
