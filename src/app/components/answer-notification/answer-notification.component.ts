import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-answer-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './answer-notification.component.html',
  styleUrls: ['./answer-notification.component.scss'],
})
export class AnswerNotificationComponent implements OnChanges {
  @Input() isCorrect: boolean | null = null;
  @Input() show: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    console.log('[Popup] Changement détecté :', changes);
  }
}
