import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'games',
    loadComponent: () => import('./pages/games/games.component').then(m => m.GamesComponent),
  },
  {
    path: '',
    loadComponent: () => import('./pages/home-page/home-page.component').then(m => m.HomePageComponent),
  }
];
