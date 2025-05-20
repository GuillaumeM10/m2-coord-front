import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'games',
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/games/games.component').then(m => m.GamesComponent)
      },
      {
        path: 'historical-figure',
        loadComponent: () =>
          import('./pages/games/historical-figure/historical-figure.component').then(m => m.HistoricalFigureComponent)
      }
    ]
  }
];

