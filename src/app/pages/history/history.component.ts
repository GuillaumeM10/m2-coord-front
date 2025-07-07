import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameHistoryEntry, HistoryService } from '@app/services/history/history.service';
import { GamesService } from '@app/services/games.service';
import { GameDto } from '@api/models/game-dto';
import { Router } from '@angular/router';
import { SmallButtonComponent } from '@app/components/common/small-button/small-button.component';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, SmallButtonComponent],
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  history: Record<string, GameHistoryEntry[]> = {};
  gameLabels: GameDto[] = [];
  protected readonly Object = Object;

  constructor(
    private historyService: HistoryService,
    private gamesService: GamesService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadHistory();
  }

  loadHistory(): void {
    this.history = this.historyService.getAllHistories();

    this.gamesService.getGames().subscribe((games: GameDto[]) => {
      this.gameLabels = games;
    });
  }

  clearHistory(game: string): void {
    this.historyService.clearHistory(game);
    this.loadHistory();
  }

  formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleString();
  }

  getGameLabel(game: string) {
    return this.gameLabels?.filter(data => data.key === game)[0]?.name;
  }

  goToMenu(): void {
    this.router.navigate(['/']);
  }
}
