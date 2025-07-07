import { Injectable } from '@angular/core';

export interface GameHistoryEntry {
  date: string;
  totalQuestions: number;
  correctAnswers: number;
}

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  private makeKey(gameType: string): string {
    return `history-${gameType}`;
  }

  addEntry(gameType: string, entry: GameHistoryEntry): void {
    const key = this.makeKey(gameType);
    const raw = localStorage.getItem(key);
    const history = raw ? (JSON.parse(raw) as GameHistoryEntry[]) : [];
    history.unshift(entry);
    localStorage.setItem(key, JSON.stringify(history));
  }

  getHistory(gameType: string): GameHistoryEntry[] {
    const raw = localStorage.getItem(this.makeKey(gameType));
    return raw ? JSON.parse(raw) : [];
  }

  clearHistory(gameType: string): void {
    localStorage.removeItem(this.makeKey(gameType));
  }

  getAllGames(): string[] {
    const prefix = 'history-';
    return Object.keys(localStorage)
      .filter(key => key.startsWith(prefix))
      .map(key => key.replace(prefix, ''));
  }

  getAllHistories(): Record<string, GameHistoryEntry[]> {
    const games = this.getAllGames();
    const map: Record<string, GameHistoryEntry[]> = {};
    for (const game of games) {
      map[game] = this.getHistory(game);
    }
    return map;
  }
}
