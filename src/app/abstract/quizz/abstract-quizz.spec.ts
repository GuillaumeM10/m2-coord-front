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

  it('should start the game and initialize first question', () => {
    instance.setQuestions(mockQuestions);
    instance.triggerStartGame();

    const state = instance.getState();
    expect(state.started).toBe(true);
    expect(state.questionIndex).toBe(0);
    expect(state.current).toEqual(mockQuestions[0]);
    expect(state.correctAnswer).toBe('B');
    expect(state.statuses).toEqual(['pending', 'pending']);
  });

  it('should select a choice when onChoiceSelected is called', () => {
    instance.setQuestions(mockQuestions);
    instance.triggerStartGame();
    instance.triggerOnChoiceSelected('C');

    const state = instance.getState();
    expect(state.answer).toEqual({ questionId: 'q1', answer: 'C' });
  });

  it('should do nothing if no current question when checking answer', () => {
    instance.triggerCheckAnswerAndGoNext();
    expect(mockQuizzService.getCorrectAnswer).not.toHaveBeenCalled();
  });

  it('should check answer and show correct popup when answer is correct', () => {
    instance.setQuestions(mockQuestions);
    instance.triggerStartGame();
    instance.triggerOnChoiceSelected('B');

    instance.triggerCheckAnswerAndGoNext();

    expect(mockQuizzService.getCorrectAnswer).toHaveBeenCalledWith('q1');
    expect(instance.getState().submitDisabled).toBe(true);
    expect(instance.getState().isCorrect).toBe(true);
    expect(instance.getState().popup).toBe(true);
    expect(instance.getState().statuses[0]).toBe('correct');
  });

  it('should check answer and show incorrect popup when answer is wrong', () => {
    instance.setQuestions(mockQuestions);
    instance.triggerStartGame();
    instance.triggerOnChoiceSelected('A');

    instance.triggerCheckAnswerAndGoNext();

    expect(mockQuizzService.getCorrectAnswer).toHaveBeenCalledWith('q1');
    expect(instance.getState().isCorrect).toBe(false);
    expect(instance.getState().popup).toBe(true);
    expect(instance.getState().statuses[0]).toBe('wrong');
  });

  it('should handle API error when checking answer', () => {
    (mockQuizzService.getCorrectAnswer as jest.Mock).mockReturnValueOnce(
      throwError(() => new Error('API error'))
    );

    instance.setQuestions(mockQuestions);
    instance.triggerStartGame();
    instance.triggerOnChoiceSelected('A');

    instance.triggerCheckAnswerAndGoNext();

    expect(instance.getState().isCorrect).toBe(false);
    expect(instance.getState().popup).toBe(true);
    expect(instance.getState().statuses[0]).toBe('wrong');
  });

  it('should move to next question after delay', () => {
    instance.setQuestions(mockQuestions);
    instance.triggerStartGame();
    instance.triggerOnChoiceSelected('A');

    instance.triggerCheckAnswerAndGoNext();

    // Fast-forward time
    jest.advanceTimersByTime(1500);

    expect(instance.getState().popup).toBe(false);
    expect(instance.getState().submitDisabled).toBe(false);
    expect(instance.getState().questionIndex).toBe(1);
    expect(instance.getState().current).toEqual(mockQuestions[1]);
    expect(instance.getState().answer).toEqual({ questionId: '', answer: '' });
  });

  it('should end game when all questions are answered', () => {
    instance.setQuestions(mockQuestions);
    instance.triggerStartGame();

    // Answer first question
    instance.triggerOnChoiceSelected('A');
    instance.triggerCheckAnswerAndGoNext();
    jest.advanceTimersByTime(1500);

    // Answer second question
    instance.triggerOnChoiceSelected('G');
    instance.triggerCheckAnswerAndGoNext();
    jest.advanceTimersByTime(1500);

    // Game should be ended
    const state = instance.getState();
    expect(state.ended).toBe(true);
    expect(state.current).toBeUndefined();
    expect(state.correctAnswer).toBeUndefined();
  });

  it('should not update selected answer when no current question', () => {
    instance.triggerOnChoiceSelected('A');
    expect(instance.getState().answer).toEqual({ questionId: '', answer: '' });
  });

  it('should handle empty questions array', () => {
    instance.setQuestions([]);
    instance.triggerStartGame();

    const state = instance.getState();
    expect(state.started).toBe(true);
    expect(state.current).toBeUndefined();
    expect(state.statuses).toEqual([]);
  });
});
