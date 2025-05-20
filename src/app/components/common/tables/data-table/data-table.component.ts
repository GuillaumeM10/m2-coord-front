import { Component, Input, OnInit } from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
} from '@angular/material/table';
import { CdkTableDataSourceInput } from '@angular/cdk/table';
import {NgForOf, TitleCasePipe} from '@angular/common';

@Component({
  selector: 'app-data-table',
  imports: [
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable,
    MatHeaderCellDef,
    TitleCasePipe,
    NgForOf,
  ],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss',
})
export class DataTableComponent implements OnInit {
  @Input() dataSource!: CdkTableDataSourceInput<unknown>;
  displayedColumns: string[] = [];

  ngOnInit() {
    if (Array.isArray(this.dataSource)) {
      this.displayedColumns = Object.keys(this.dataSource[0]);
    }
  }
}
