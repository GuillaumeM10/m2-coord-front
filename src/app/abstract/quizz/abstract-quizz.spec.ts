import { AbstractQuizz } from './abstract-quizz';
import { TestBed } from '@angular/core/testing';
import { QuizzService } from '@app/services/quizz/quizz.service';
import { DestroyRef, Injector, runInInjectionContext } from '@angular/core';
import { of, throwError } from 'rxjs';
import { QuestionModel } from '@app/models/question.model';

class TestQuizz extends AbstractQuizz {
  public triggerStartGame() {
    this.startGame();
  }

  public triggerOnChoiceSelected(choice: string) {
    this.onChoiceSelected(choice);
  }

  public triggerCheckAnswerAndGoNext() {
    this.checkAnswerAndGoNext();
  }

  public setQuestions(questions: QuestionModel[]) {
    this.questions = questions;
  }

  public getState() {
    return {
      started: this.gameStarted,
      ended: this.gameEnded,
      current: this.currentQuestion,
      answer: this.choosenAnswer,
      questionIndex: this.currentQuestionIndex,
      statuses: this.questionStatuses,
      popup: this.showPopup,
      isCorrect: this.isCorrectAnswer,
      submitDisabled: this.submitButtonDisabled,
      correctAnswer: this.correctAnswer,
    };
  }
}

describe('AbstractQuizz', () => {
  let instance: TestQuizz;
  let mockQuizzService: Partial<QuizzService>;
  let mockQuestions: QuestionModel[];

  const setupTestInstance = () => {
    runInInjectionContext(TestBed.inject(Injector), () => {
      instance = new TestQuizz();
    });
  };

  beforeEach(() => {
    jest.useFakeTimers();

    mockQuestions = [
      {
        id: 'q1',
        image: 'image1.jpg',
        choices: ['A', 'B', 'C', 'D'],
        correctAnswer: 'B',
      },
      {
        id: 'q2',
        image: 'image2.jpg',
        choices: ['E', 'F', 'G', 'H'],
        correctAnswer: 'G',
      },
    ];

    mockQuizzService = {
      getCorrectAnswer: jest.fn().mockReturnValue(of({ correctAnswer: 'B' })),
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: QuizzService, useValue: mockQuizzService },
        { provide: DestroyRef, useValue: { onDestroy: jest.fn() } },
      ],
    });

    setupTestInstance();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should start the game', () => {
    instance.triggerStartGame();
    expect(instance.getState().started).toBe(true);
  });

  it('should properly handle setTimeout after checking answer', () => {
    // Set up spy on setTimeout
    jest.spyOn(global, 'setTimeout');

    // Setup test state
    instance.setQuestions(mockQuestions);
    instance.triggerStartGame();
    instance.triggerOnChoiceSelected('B');

    // Initial state
    expect(instance.getState().popup).toBe(false);
    expect(instance.getState().submitDisabled).toBe(false);
    expect(instance.getState().questionIndex).toBe(0);

    // Trigger the method that contains setTimeout
    instance.triggerCheckAnswerAndGoNext();

    // Verify setTimeout was called with correct timing
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1500);

    // State immediately after calling method (before timeout executes)
    expect(instance.getState().popup).toBe(true);
    expect(instance.getState().submitDisabled).toBe(true);
    expect(instance.getState().questionIndex).toBe(0);

    // Fast-forward time to execute the setTimeout callback
    jest.advanceTimersByTime(1500);

    // Verify the state changes inside the setTimeout callback
    expect(instance.getState().popup).toBe(false);
    expect(instance.getState().submitDisabled).toBe(false);
    expect(instance.getState().questionIndex).toBe(1); // Should have moved to next question
    expect(instance.getState().current).toEqual(mockQuestions[1]);
  });

  it('should properly handle setTimeout in error case', () => {
    // Mock the service to throw an error
    (mockQuizzService.getCorrectAnswer as jest.Mock).mockReturnValueOnce(
      throwError(() => new Error('API error')),
    );

    // Set up spy on setTimeout
    jest.spyOn(global, 'setTimeout');

    // Setup test state
    instance.setQuestions(mockQuestions);
    instance.triggerStartGame();

    // Trigger the method that contains setTimeout
    instance.triggerCheckAnswerAndGoNext();

    // Verify setTimeout was called with correct timing
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1500);

    // State immediately after calling method (before timeout executes)
    expect(instance.getState().popup).toBe(true);
    expect(instance.getState().submitDisabled).toBe(true);
    expect(instance.getState().isCorrect).toBe(false);
    expect(instance.getState().questionIndex).toBe(0);

    // Fast-forward time to execute the setTimeout callback
    jest.advanceTimersByTime(1500);

    // Verify the state changes inside the setTimeout callback
    expect(instance.getState().popup).toBe(false);
    expect(instance.getState().submitDisabled).toBe(false);
    expect(instance.getState().questionIndex).toBe(1); // Should have moved to next question
  });

  it('should execute goToNextQuestion properly when called via setTimeout', () => {
    // Setup test state with only one question to test game ending
    const singleQuestion = [mockQuestions[0]];
    instance.setQuestions(singleQuestion);
    instance.triggerStartGame();

    // Check answer to trigger setTimeout
    instance.triggerCheckAnswerAndGoNext();

    // State before timeout
    expect(instance.getState().ended).toBe(false);
    expect(instance.getState().current).toBeDefined();

    // Fast-forward time to execute the setTimeout callback
    jest.advanceTimersByTime(1500);

    // Game should end since there are no more questions
    expect(instance.getState().ended).toBe(true);
    expect(instance.getState().current).toBeUndefined();
    expect(instance.getState().correctAnswer).toBeUndefined();
  });
});
