import { AbstractQuizz } from './abstract-quizz';
import { TestBed } from '@angular/core/testing';
import { QuizzService } from '../../services/quizz/quizz.service';
import { DestroyRef, Injector, runInInjectionContext } from '@angular/core';

class TestQuizz extends AbstractQuizz {
  public triggerStartGame() {
    this.startGame();
  }

  public getState() {
    return {
      started: this.gameStarted,
      ended: this.gameEnded,
      current: this.currentQuestion,
      answer: this.choosenAnswer,
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
