import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { GamesService } from '@app/services/games.service';
import { HttpClient } from '@angular/common/http';
import { GameDto } from '@api/models/game-dto';
import { Router } from '@angular/router';
import { CornerHoverDirective } from '@app/directives/corner-hover.directive';
import { SmallButtonComponent } from '@app/components/common/small-button/small-button.component';

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDialogModule,
    CornerHoverDirective,
    SmallButtonComponent,
  ],
  providers: [HttpClient],
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
})
export class GamesComponent implements OnInit {
  games: GameDto[] = [];

  constructor(
    private gamesService: GamesService,
    private dialog: MatDialog,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.gamesService.getGames().subscribe(games => {
      this.games = games;
    });
  }

  openGameOptions(game: GameDto): void {
    // Open mode popup to select game modes
    // const dialogRef = this.dialog.open(GameOptionsDialogComponent, {
    //   data: game,
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     this.router.navigate(['/games', result.game]).then();
    //   }
    // });

    this.router.navigate(['/games', game.key]).then();
  }

  goToHistory(): void {
    this.router.navigate(['/history']);
  }
}
