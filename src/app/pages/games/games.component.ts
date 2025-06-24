import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { GamesService } from '@app/services/games.service';
import { GameOptionsDialogComponent } from '@app/components/games/game-options-dialog/game-options-dialog.component';
import { HttpClient } from '@angular/common/http';
import { GameDto } from '@api/models/game-dto';
import { CornerHoverDirective } from '@app/directives/corner-hover.directive';

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatDialogModule, CornerHoverDirective],
  providers: [HttpClient],
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
})
export class GamesComponent implements OnInit {
  games: GameDto[] = [];

  constructor(
    private gamesService: GamesService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.gamesService.getGames().subscribe(games => {
      this.games = games;
    });
  }

  openGameOptions(game: GameDto): void {
    this.dialog.open(GameOptionsDialogComponent, {
      data: game,
    });
  }
}
