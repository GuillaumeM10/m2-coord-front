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

  it('should store selected choice', () => {
    const question: Question = {
      id: '42',
      image: 'test.jpg',
      choices: ['A', 'B'],
    };
    instance.setCurrentQuestion(question);
    instance.triggerChoice('B');
    expect(instance.getState().answers).toEqual([{ id: '42', answer: 'B' }]);
  });

  it('should end game when no questions', () => {
    instance.setQuestions([]);
    instance.triggerNextQuestion();
    expect(instance.getState().ended).toBe(true);
  });

  it('should move to next question', () => {
    const q1: Question = { id: '1', image: '', choices: ['A'] };
    const q2: Question = { id: '2', image: '', choices: ['B'] };
    instance.setQuestions([q1, q2]);
    instance.triggerNextQuestion();
    expect(instance.getState().current).toEqual(q1);
  });
});
