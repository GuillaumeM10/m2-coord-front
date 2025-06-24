import { Component, Input } from '@angular/core';
import { BigButtonComponent } from '@app/components/common/big-button/big-button.component';

@Component({
  selector: 'app-scoreboard',
  imports: [BigButtonComponent],
  templateUrl: './scoreboard.component.html',
  styleUrl: './scoreboard.component.scss',
})
export class ScoreboardComponent {
  @Input()
  recap: ('pending' | 'correct' | 'wrong')[] = [];

  get total(): number {
    return this.recap.length;
  }

  get correct(): number {
    return this.recap.filter(r => r === 'correct').length;
  }

  get message(): string {
    const ratio = this.correct / this.total;
    if (ratio === 1) return '🎉 Parfait ! Bravo !';
    if (ratio >= 0.75) return '👏 Très bon score !';
    if (ratio >= 0.5) return '💪 Pas mal, continue !';
    return '🙃 Tu peux faire mieux !';
  }

  protected onReplay(): void {
    window.location.reload();
  }
}
