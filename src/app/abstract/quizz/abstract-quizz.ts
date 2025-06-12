import { Question } from '../../models/questions.model';
import { inject } from '@angular/core';
import { QuizzService } from '../../services/quizz/quizz.service';

export abstract class AbstractQuizz {
  protected quizzService = inject(QuizzService);

  protected gameStarted = false;
  protected currentQuestion: Question | undefined;
  protected questions: Question[] | undefined;

  protected startGame(): void {
    this.gameStarted = true;
  }
}
