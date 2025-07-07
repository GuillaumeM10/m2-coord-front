import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlagsComponent } from './flags.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { QuizzService } from '@app/services/quizz/quizz.service';
import { of } from 'rxjs';
import { QuestionModel } from '@app/models/question.model';

describe('FlagsComponent', () => {
  let component: FlagsComponent;
  let fixture: ComponentFixture<FlagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlagsComponent, HttpClientTestingModule],
      providers: [
        {
          provide: QuizzService,
          useValue: {
            getQuestions: () => of([]),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FlagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch questions on init and initialize state', () => {
    const questionsMock: QuestionModel[] = [
      { id: '1', image: 'flag1.png', choices: ['France', 'Germany'], correctAnswer: 'France' },
      { id: '2', image: 'flag2.png', choices: ['Spain', 'Italy'], correctAnswer: 'Italy' },
    ];

    const quizzService = TestBed.inject(QuizzService);
    jest.spyOn(quizzService, 'getQuestions').mockReturnValue(of(questionsMock));

    component.ngOnInit();

    expect(quizzService.getQuestions).toHaveBeenCalledWith('countries/questions');
    expect(component['questions']).toEqual(questionsMock);
    expect(component['questionStatuses']).toEqual(['pending', 'pending']);
    expect(component['currentQuestionIndex']).toBe(0);
    expect(component['currentQuestion']).toEqual(questionsMock[0]);
  });

  it('should track choices by value', () => {
    const value = component.trackByChoice(0, 'France');
    expect(value).toBe('France');
  });
});
