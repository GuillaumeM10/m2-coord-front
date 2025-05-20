import { Routes } from '@angular/router';
import {GamesComponent} from './pages/games/games.component';
import {HistoricalFigureComponent} from './pages/games/historical-figure/historical-figure.component';
export const routes: Routes = [
  {
    path: 'games',
    children: [
      {
        path: '',
        component: GamesComponent,
      },
      {
        path: 'historical-figure',
        component: HistoricalFigureComponent,
      },
    ],
  },
];
