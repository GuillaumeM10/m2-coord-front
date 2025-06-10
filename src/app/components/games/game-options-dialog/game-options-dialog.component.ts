import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-options-dialog',
  standalone: true,
  imports: [MatDialogModule, FormsModule, MatRadioModule, MatButtonModule],
  templateUrl: './game-options-dialog.component.html',
  styleUrls: ['./game-options-dialog.component.scss'],
})
export class GameOptionsDialogComponent {
  selectedOption: string | null = null;

  constructor(
    public dialogRef: MatDialogRef<GameOptionsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public game: { name: string },
    private routerService: Router,
  ) {}

  async play() {
    if (this.selectedOption) {
      console.log('Option choisie :', this.selectedOption);
      this.dialogRef.close(this.selectedOption);
      // TODO: Redirect by id
      await this.routerService.navigate(['/games/historical-figure']);
    }
  }

  close() {
    this.dialogRef.close();
  }
}
