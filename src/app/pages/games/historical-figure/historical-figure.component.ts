import { Component } from '@angular/core';
import { BigButtonComponent } from '../../../components/common/big-button/big-button.component';
import { NgIf } from '@angular/common';
import { AbstractQuizz } from '../../../abstract/quizz/abstract-quizz';
import { OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { Question } from '../../../models/questions.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SmallButtonComponent } from '../../../components/common/small-button/small-button.component';

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
        tap((questions: Question[]) => {
          this.questions = questions;
          this.nextQuestion();
        }),
      )
      .subscribe();
  }
}
