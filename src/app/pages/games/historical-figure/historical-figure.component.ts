import { Component } from '@angular/core';
import { BigButtonComponent } from '@app/components/common/big-button/big-button.component';
import { NgIf } from '@angular/common';
import { AbstractQuizz } from '@app/abstract/quizz/abstract-quizz';
import { OnInit } from '@angular/core';
import { QuestionModel } from '@app/models/question.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SmallButtonComponent } from '@app/components/common/small-button/small-button.component';
import { QuestionProgressComponent } from '@app/components/common/question-progress/question-progress.component';

@Component({
  selector: 'app-historical-figure',
  imports: [BigButtonComponent, NgIf, SmallButtonComponent, QuestionProgressComponent],
  templateUrl: './historical-figure.component.html',
  styleUrl: './historical-figure.component.scss',
})
export class HistoricalFigureComponent extends AbstractQuizz implements OnInit {
  ngOnInit() {
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
}
