import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- ajoute ça

@Component({
  selector: 'app-question-progress',
  templateUrl: './question-progress.component.html',
  styleUrls: ['./question-progress.component.scss'],
  standalone: true,
  imports: [CommonModule], // <-- ajoute ça pour pouvoir utiliser ngClass, *ngFor, etc.
})
export class QuestionProgressComponent {
  /** Statut des questions en entrée, tableau d'états : 'pending', 'correct' | 'wrong' */
  @Input() statuses: ('pending' | 'correct' | 'wrong')[] = [];
}
