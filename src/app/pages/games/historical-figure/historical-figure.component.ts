import {Component, OnInit} from '@angular/core';
import {BigButtonComponent} from '@app/components/common/big-button/big-button.component';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {AbstractQuizz} from '@app/abstract/quizz/abstract-quizz';
import {QuestionModel} from '@app/models/question.model';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {QuestionProgressComponent} from '@app/components/common/question-progress/question-progress.component';
import {AnswerNotificationComponent} from '@app/components/answer-notification/answer-notification.component';
import {ScoreboardComponent} from '@app/components/common/scoreboard/scoreboard.component';
import {Router} from '@angular/router';
import {SmallButtonComponent} from '@app/components/common/small-button/small-button.component';

@Component({
  selector: 'app-historical-figure',
  imports: [
    BigButtonComponent,
    NgIf,
    QuestionProgressComponent,
    AnswerNotificationComponent,
    ScoreboardComponent,
    NgClass,
    NgForOf,
    SmallButtonComponent,
  ],
  templateUrl: './historical-figure.component.html',
  styleUrl: './historical-figure.component.scss',
})
export class HistoricalFigureComponent extends AbstractQuizz implements OnInit {
  constructor(
    private router: Router,
  ) {
    super();
  }

  ngOnInit() {
    this.game = 'historical-figures';
    this.quizzService
      .getQuestions('figures/questions')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((questions: QuestionModel[]) => {
        console.log(questions);
        this.questions = questions;
        this.questionStatuses = questions.map(() => 'pending');
        this.currentQuestionIndex = 0;
        this.currentQuestion = this.questions[this.currentQuestionIndex];
      });
  }

  trackByChoice(index: number, item: string): string {
    return item;
  }

  async goBack(): Promise<void> {
    await this.router.navigate(['/games']);
  }
}
