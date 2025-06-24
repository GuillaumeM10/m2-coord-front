import { Component, OnInit } from '@angular/core';
import { BigButtonComponent } from '@app/components/common/big-button/big-button.component';
import { SmallButtonComponent } from '@app/components/common/small-button/small-button.component';
import { QuestionProgressComponent } from '@app/components/common/question-progress/question-progress.component';
import { AbstractQuizz } from '@app/abstract/quizz/abstract-quizz';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { QuestionModel } from '@mocks/models/question.model.mock';
import { ScoreboardComponent } from '@app/components/common/scoreboard/scoreboard.component';

@Component({
  selector: 'app-flags',
  standalone: true,
  imports: [
    BigButtonComponent,
    SmallButtonComponent,
    QuestionProgressComponent,
    CommonModule,
    ScoreboardComponent,
  ],
  templateUrl: './flags.component.html',
  styleUrls: ['./flags.component.scss'],
})
export class FlagsComponent extends AbstractQuizz implements OnInit {
  ngOnInit() {
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
}
