import { Component } from '@angular/core';
import { BigButtonComponent } from '../../../components/common/big-button/big-button.component';
import { NgIf } from '@angular/common';
import { AbstractQuizz } from '../../../abstract/quizz/abstract-quizz';
import { OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { Question } from '../../../models/questions.model';

@Component({
  selector: 'app-historical-figure',
  imports: [BigButtonComponent, NgIf],
  templateUrl: './historical-figure.component.html',
  styleUrl: './historical-figure.component.scss',
})
export class HistoricalFigureComponent extends AbstractQuizz implements OnInit {
  ngOnInit() {
    this.quizzService
      .getQuestions('historical-figure')
      .pipe(
        tap((questions: Question[]) => {
          this.questions = questions;
        }),
      )
      .subscribe();
  }
}
