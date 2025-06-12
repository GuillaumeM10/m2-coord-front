import { Question } from '../../models/questions.model';
import { DestroyRef, inject } from '@angular/core';
import { QuizzService } from '../../services/quizz/quizz.service';

export abstract class AbstractQuizz {
  protected quizzService = inject(QuizzService);

  protected gameStarted = false;
  protected gameEnded = false;
  protected currentQuestion: Question | undefined;
  protected questions: Question[] | undefined;
  protected destroyRef: DestroyRef = inject(DestroyRef);
  protected choosenAnswers: { id: string; answer: string }[] = [];

  protected startGame(): void {
    this.gameStarted = true;
  }

  protected onChoiceSelected(choice: string): void {
    if (this.currentQuestion) {
      this.choosenAnswers.push({
        id: this.currentQuestion.id,
        answer: choice,
      });
    }
  }

  protected nextQuestion(): void {
    if (!this.questions || this.questions.length === 0) {
      this.gameEnded = true;
      console.log('Game ended. Choosen answers:', this.choosenAnswers);
      return;
    }

    this.currentQuestion = this.questions.shift();
  }
}
