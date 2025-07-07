import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AbstractQuizz } from '@app/abstract/quizz/abstract-quizz';
import { BigButtonComponent } from '@app/components/common/big-button/big-button.component';
import { QuestionProgressComponent } from '@app/components/common/question-progress/question-progress.component';
import { AnswerNotificationComponent } from '@app/components/answer-notification/answer-notification.component';
import { QuestionModel } from '@app/models/question.model';
import { ScoreboardComponent } from '@app/components/common/scoreboard/scoreboard.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flags',
  standalone: true,
  imports: [
    CommonModule,
    BigButtonComponent,
    QuestionProgressComponent,
    AnswerNotificationComponent,
    ScoreboardComponent,
  ],
  templateUrl: './flags.component.html',
  styleUrls: ['./flags.component.scss'],
})
export class FlagsComponent extends AbstractQuizz implements OnInit {

  constructor(
    private router: Router,
  ) {
    super();
  }

  ngOnInit() {
    this.game = 'flags';
    this.quizzService
      .getQuestions('countries/questions')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((questions: QuestionModel[]) => {
        this.questions = questions;
        this.questionStatuses = questions.map(() => 'pending');
        this.currentQuestionIndex = 0;
        this.currentQuestion = this.questions[this.currentQuestionIndex];
      });
  }

  // 👇 Pour corriger le trackBy
  trackByChoice(index: number, item: string): string {
    return item;
  }

  async goBack(): Promise<void> {
    await this.router.navigate(['/games']);
  }
}
