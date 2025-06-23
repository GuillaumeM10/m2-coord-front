import { AbstractQuizz } from './abstract-quizz';
import { QuestionModel } from '@mocks/models/question.model.mock';
import { TestBed } from '@angular/core/testing';
import { QuizzService } from '@app/services/quizz/quizz.service';
import { DestroyRef, Injector, runInInjectionContext } from '@angular/core';
import { of } from 'rxjs';

class TestQuizz extends AbstractQuizz {
  public triggerStartGame() {
    this.startGame();
  }

  public setCurrentQuestion(question: QuestionModel) {
    this.currentQuestion = question;
  }

  public triggerChoice(choice: string) {
    this.onChoiceSelected(choice);
  }

  public setQuestions(questions: QuestionModel[]) {
    this.questions = questions;
    if (questions.length > 0) {
      this.currentQuestion = questions[0];
    }
  }

  public triggerNextQuestion() {
    this.nextQuestion();
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
  let mockQuizzService: Partial<QuizzService>;

  beforeEach(() => {
    mockQuizzService = {
      answerIsCorrect: jest.fn().mockReturnValue(of({ isAnswerCorrect: true })),
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: QuizzService, useValue: mockQuizzService },
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
