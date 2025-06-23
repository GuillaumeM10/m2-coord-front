export abstract class AbstractQuizz {
  protected quizzService = inject(QuizzService);

  protected gameStarted = false;
  protected gameEnded = false;
  protected currentQuestion: QuestionModel | undefined;
  protected questions: QuestionModel[] | undefined;
  protected destroyRef: DestroyRef = inject(DestroyRef);
  protected choosenAnswer: Answer = { questionId: '', answer: '' };
  protected game = '';

  protected questionStatuses: ('pending' | 'correct' | 'wrong')[] = [];
  protected currentQuestionIndex = 0; // <- Ajouté

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

  protected nextQuestion(): void {
    this.quizzService.answerIsCorrect(this.choosenAnswer).subscribe({
      next: isCorrect => {
        console.log('Bonne réponse :', isCorrect);
        this.updateQuestionStatus(this.currentQuestionIndex, isCorrect ? 'correct' : 'wrong');
        this.advanceQuestion();
      },
      error: err => {
        console.error('Erreur lors de la vérification de la réponse :', err);
        this.updateQuestionStatus(this.currentQuestionIndex, 'wrong');
        this.advanceQuestion();
      },
    });
  }

  private advanceQuestion(): void {
    if (!this.questions) {
      this.gameEnded = true;
      this.currentQuestion = undefined;
      console.log('Le jeu est terminé.');
      return;
    }

    this.currentQuestionIndex++;

    if (this.currentQuestionIndex >= this.questions.length) {
      this.gameEnded = true;
      this.currentQuestion = undefined;
      console.log('Le jeu est terminé.');
      return;
    }

    this.currentQuestion = this.questions[this.currentQuestionIndex];
    this.choosenAnswer = { questionId: '', answer: '' };
  }

  private updateQuestionStatus(index: number, status: 'correct' | 'wrong') {
    this.questionStatuses[index] = status;
  }
}
