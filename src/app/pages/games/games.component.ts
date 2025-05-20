import { Component } from '@angular/core';
import {ScoreboardPageComponent} from '../scoreboard-page/scoreboard-page.component';

@Component({
  selector: 'app-games',
  imports: [
    ScoreboardPageComponent
  ],
  templateUrl: './games.component.html',
  styleUrl: './games.component.scss',
})
export class GamesComponent {}
