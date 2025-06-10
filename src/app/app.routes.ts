import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/games/games.component').then(m => m.GamesComponent),
  },
];
