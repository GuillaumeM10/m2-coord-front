import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'games',
    pathMatch: 'full',
  },
  {
    path: 'games',
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/games/games.component').then(m => m.GamesComponent),
      },
      {
        path: 'historical-figures',
        loadComponent: () =>
          import('./pages/games/historical-figure/historical-figure.component').then(
            m => m.HistoricalFigureComponent,
          ),
      },
      {
        path: 'flags',
        loadComponent: () =>
          import('./pages/games/flags/flags.component').then(m => m.FlagsComponent),
      },
    ],
  },
  {
    path: 'history',
    loadComponent: () => import('./pages/history/history.component').then(m => m.HistoryComponent),
  },
];
