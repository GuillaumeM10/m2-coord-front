import { Component } from '@angular/core';
import { BigButtonComponent } from '@app/components/common/big-button/big-button.component';
import { NgIf } from '@angular/common';
import { AbstractQuizz } from '@app/abstract/quizz/abstract-quizz';
import { OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { QuestionModel } from '@mocks/models/question.model.mock';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SmallButtonComponent } from '@app/components/common/small-button/small-button.component';

@Component({
  selector: 'app-historical-figure',
  imports: [BigButtonComponent, NgIf, SmallButtonComponent],
  templateUrl: './historical-figure.component.html',
  styleUrl: './historical-figure.component.scss',
})
export class HistoricalFigureComponent extends AbstractQuizz implements OnInit {
  ngOnInit() {
    this.quizzService
      .getQuestions('historical-figure')
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((questions: QuestionModel[]) => {
          this.questions = questions;
          this.nextQuestion();
        }),
      )
      .subscribe();
  }
}
