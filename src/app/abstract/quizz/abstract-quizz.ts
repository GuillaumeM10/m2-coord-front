import { DestroyRef, inject } from '@angular/core';
import { QuizzService } from '@app/services/quizz/quizz.service';
import { QuestionModel } from '@mocks/models/question.model.mock';
import { AnswerModel } from '@mocks/models/answer.model.mock';

export abstract class AbstractQuizz {
  protected quizzService: QuizzService = inject(QuizzService);

  protected gameStarted = false;
  protected gameEnded = false;
  protected currentQuestion: QuestionModel | undefined;
  protected questions: QuestionModel[] | undefined;
  protected destroyRef: DestroyRef = inject(DestroyRef);
  protected choosenAnswer: AnswerModel = { questionId: '', answer: '' };
  protected game = '';

  protected questionStatuses: ('pending' | 'correct' | 'wrong')[] = [];
  protected currentQuestionIndex = 0;

  protected startGame(): void {
    this.gameStarted = true;
  }

  protected onChoiceSelected(choice: string): void {
    if (this.currentQuestion) {
      this.choosenAnswer = {
        questionId: this.currentQuestion.id,
        answer: choice,
      };
    }
  }

  protected checkAnswerAndGoNext(): void {
    this.quizzService.answerIsCorrect(this.choosenAnswer).subscribe({
      next: (response: { isAnswerCorrect: boolean }) => {
        const isCorrect = response.isAnswerCorrect;
        console.log('Réponse du service:', response);
        this.questionStatuses[this.currentQuestionIndex] = isCorrect ? 'correct' : 'wrong';
        this.goToNextQuestion();
      },
      error: () => {
        this.questionStatuses[this.currentQuestionIndex] = 'wrong';
        this.goToNextQuestion();
      },
    });
  }

  private goToNextQuestion(): void {
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex >= (this.questions?.length || 0)) {
      this.gameEnded = true;
      this.currentQuestion = undefined;
      console.log('Le jeu est terminé.');
    } else {
      this.currentQuestion = this.questions![this.currentQuestionIndex];
      this.choosenAnswer = { questionId: '', answer: '' }; // reset réponse
    }
  }
}
