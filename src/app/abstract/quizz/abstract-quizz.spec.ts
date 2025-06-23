import { AbstractQuizz } from './abstract-quizz';
import { Question } from '../../models/questions.model';
import { TestBed } from '@angular/core/testing';
import { QuizzService } from '../../services/quizz/quizz.service';
import { DestroyRef, Injector, runInInjectionContext } from '@angular/core';

class TestQuizz extends AbstractQuizz {
  public triggerStartGame() {
    this.startGame();
  }

  public setCurrentQuestion(question: Question) {
    this.currentQuestion = question;
  }

  public triggerChoice(choice: string) {
    this.onChoiceSelected(choice);
  }

  public setQuestions(questions: Question[]) {
    this.questions = questions;
  }

  public triggerNextQuestion() {
    this.nextQuestion();
  }

  public getState() {
    return {
      started: this.gameStarted,
      ended: this.gameEnded,
      current: this.currentQuestion,
      answers: this.choosenAnswers,
    };
  }
}

describe('AbstractQuizz', () => {
  let instance: TestQuizz;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: QuizzService, useValue: {} },
        { provide: DestroyRef, useValue: {} },
      ],
    });

    runInInjectionContext(TestBed.inject(Injector), () => {
      instance = new TestQuizz();
    });
  });

  it('should start the game', () => {
    instance.triggerStartGame();
    expect(instance.getState().started).toBe(true);
  });
});
