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

  it('should store selected choice', () => {
    const question: QuestionModel = {
      id: '42',
      image: 'test.jpg',
      choices: ['A', 'B'],
    };
    instance.setCurrentQuestion(question);
    instance.triggerChoice('B');
    expect(instance.getState().answer).toEqual({ questionId: '42', answer: 'B' });
  });

  it('should end game when no questions', () => {
    instance.setQuestions([]);
    instance.triggerNextQuestion();
    expect(instance.getState().ended).toBe(true);
  });

  it('should show first question when questions are set', () => {
    const q1: QuestionModel = { id: '1', image: '', choices: ['A'] };
    const q2: QuestionModel = { id: '2', image: '', choices: ['B'] };
    instance.setQuestions([q1, q2]);
    expect(instance.getState().current).toEqual(q1);
  });

  it('should move to next question after answer validation', done => {
    const q1: QuestionModel = { id: '1', image: '', choices: ['A'] };
    const q2: QuestionModel = { id: '2', image: '', choices: ['B'] };
    instance.setQuestions([q1, q2]);
    expect(instance.getState().current).toEqual(q1);
    instance.triggerChoice('A');
    instance.triggerNextQuestion();
    setTimeout(() => {
      expect(instance.getState().current).toEqual(q2);
      done();
    });
  });
});
