import { Component } from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';
import {scoreLinesMock} from '../../mocks/scoreboard/score-lines.mock';
import {ScoreLineType} from '../../types/mocks/score-line.type';

@Component({
  selector: 'app-scoreboard-page',
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef
  ],
  templateUrl: './scoreboard-page.component.html',
  styleUrl: './scoreboard-page.component.scss',
})
export class ScoreboardPageComponent {
  displayedColumns: string[] = Object.keys(scoreLinesMock[0]);
  dataSource: ScoreLineType[] = scoreLinesMock;
}
