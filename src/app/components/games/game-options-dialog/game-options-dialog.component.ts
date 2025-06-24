import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { GameDto } from '@api/models/game-dto';

@Component({
  selector: 'app-game-options-dialog',
  standalone: true,
  imports: [MatDialogModule, FormsModule, MatRadioModule, MatButtonModule, CommonModule],
  templateUrl: './game-options-dialog.component.html',
  styleUrls: ['./game-options-dialog.component.scss'],
})
export class GameOptionsDialogComponent {
  selectedOption: string | null = null;

  constructor(
    public dialogRef: MatDialogRef<GameOptionsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public game: GameDto,
  ) {}

  play() {
    if (this.selectedOption) {
      this.dialogRef.close({
        game: this.game.key,
        mode: this.selectedOption,
      });
    }
  }

  close() {
    this.dialogRef.close();
  }
}
