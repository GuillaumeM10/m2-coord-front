import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Game } from '../../models/game.model';
import { GamesService } from '../../services/games.service';
import { GameOptionsDialogComponent } from '../../components/games/game-options-dialog/game-options-dialog.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatDialogModule],
  providers: [HttpClient],
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
})
export class GamesComponent implements OnInit {
  games: Game[] = [];

  constructor(
    private gamesService: GamesService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.gamesService.getGames().subscribe(games => {
      this.games = games;
    });
  }

  openGameOptions(game: Game): void {
    this.dialog.open(GameOptionsDialogComponent, {
      data: game,
    });
  }
}
