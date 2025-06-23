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
  ngOnInit() {
    this.quizzService
      .getQuestions('countries/questions')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((questions: Question[]) => {
        this.questions = questions;
        this.questionStatuses = questions.map(() => 'pending');
        this.currentQuestionIndex = 0;
        this.currentQuestion = this.questions[this.currentQuestionIndex];
      });
  }
}
