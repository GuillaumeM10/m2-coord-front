import { Component } from '@angular/core';
import { DataTableComponent } from '../../components/common/tables/data-table/data-table.component';
import { ScoreLineType } from '../../types/mocks/score-line.type';
import { scoreLinesMock } from '../../mocks/scoreboard/score-lines.mock';

@Component({
  selector: 'app-scoreboard-page',
  imports: [DataTableComponent],
  templateUrl: './scoreboard-page.component.html',
  styleUrl: './scoreboard-page.component.scss',
})
export class ScoreboardPageComponent {
  public scoreLines: ScoreLineType[] = scoreLinesMock;
}
