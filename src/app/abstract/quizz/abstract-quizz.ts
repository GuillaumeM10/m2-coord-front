import { DestroyRef, inject } from '@angular/core';
import { QuizzService } from '@app/services/quizz/quizz.service';
import { QuestionModel } from '@app/models/question.model';
import { AnswerModel } from '@app/models/answer.model';
import { HistoryService } from '@app/services/history/history.service';

export abstract class AbstractQuizz {
  // Variables pour la popup
  public showPopup = false;
  public isCorrectAnswer: boolean | null = null;
  protected quizzService: QuizzService = inject(QuizzService);
  protected historyService: HistoryService = inject(HistoryService);
  protected gameStarted = false;
  protected gameEnded = false;
  protected currentQuestion: QuestionModel | undefined;
  protected questions: QuestionModel[] | undefined;
  protected destroyRef: DestroyRef = inject(DestroyRef);
  protected choosenAnswer: AnswerModel = { questionId: '', answer: '' };
  protected game = '';
  protected questionStatuses: ('pending' | 'correct' | 'wrong')[] = [];
  protected currentQuestionIndex = 0;
  protected correctAnswer: string | undefined;
  protected submitButtonDisabled = false;

  protected startGame(): void {
    this.gameStarted = true;
    this.currentQuestionIndex = 0;
    this.currentQuestion = this.questions ? this.questions[0] : undefined;
    this.correctAnswer = this.currentQuestion?.correctAnswer;
    this.questionStatuses = this.questions?.map(() => 'pending') || [];
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
    if (!this.currentQuestion) return;
    this.submitButtonDisabled = true;

    this.quizzService.getCorrectAnswer(this.currentQuestion.id).subscribe({
      next: (response: { correctAnswer: string }) => {
        this.correctAnswer = response.correctAnswer;
        const isCorrect = this.choosenAnswer.answer === this.correctAnswer;

        console.log('✅ Bonne réponse :', this.correctAnswer);

        this.isCorrectAnswer = isCorrect;
        this.showPopup = true;
        this.questionStatuses[this.currentQuestionIndex] = isCorrect ? 'correct' : 'wrong';

        setTimeout(() => {
          this.submitButtonDisabled = false;
          this.showPopup = false;
          this.goToNextQuestion();
        }, 1500);
      },
      error: () => {
        this.isCorrectAnswer = false;
        this.showPopup = true;
        this.questionStatuses[this.currentQuestionIndex] = 'wrong';

        setTimeout(() => {
          this.submitButtonDisabled = false;
          this.showPopup = false;
          this.goToNextQuestion();
        }, 1500);
      },
    });
  }

  private goToNextQuestion(): void {
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex >= (this.questions?.length || 0)) {
      this.gameEnded = true;
      this.currentQuestion = undefined;
      this.correctAnswer = undefined;

      this.historyService.addEntry(this.game, {
        date: new Date().toISOString(),
        totalQuestions: this.questions?.length || 0,
        correctAnswers: this.questionStatuses.filter(r => r === 'correct').length,
      });

      console.log('Le jeu est terminé.');
    } else {
      this.currentQuestion = this.questions![this.currentQuestionIndex];
      this.correctAnswer = this.currentQuestion.correctAnswer;
      this.choosenAnswer = { questionId: '', answer: '' }; // reset réponse
    }
  }
}
