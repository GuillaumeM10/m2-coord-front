import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'games',
    loadComponent: () =>
      import('./pages/games/games.component').then(m => m.GamesComponent)
  }
];
