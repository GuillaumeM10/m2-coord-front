import { Component, OnInit } from '@angular/core';
import { BigButtonComponent } from '../../../components/common/big-button/big-button.component';
import { SmallButtonComponent } from '../../../components/common/small-button/small-button.component';
import { QuestionProgressComponent } from '../../../components/common/question-progress/question-progress.component';
import { AbstractQuizz } from '../../../abstract/quizz/abstract-quizz';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Question } from '../../../models/questions.model';

@Component({
  selector: 'app-flags',
  standalone: true,
  imports: [BigButtonComponent, SmallButtonComponent, QuestionProgressComponent, CommonModule],
  templateUrl: './flags.component.html',
  styleUrls: ['./flags.component.scss'],
})
export class FlagsComponent extends AbstractQuizz implements OnInit {
  override questionStatuses: ('pending' | 'correct' | 'wrong')[] = [];
  override currentQuestionIndex = 0;

  ngOnInit() {
    this.quizzService.getQuestions('countries/questions')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((questions: Question[]) => {
        this.questions = questions;
        this.questionStatuses = questions.map(() => 'pending');
        this.currentQuestionIndex = 0;
        this.currentQuestion = this.questions[this.currentQuestionIndex];
      });
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
    }
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
