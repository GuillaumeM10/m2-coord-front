import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistoricalFigureComponent } from './historical-figure.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { QuizzService } from '@app/services/quizz/quizz.service';
import { of } from 'rxjs';
import { QuestionModel } from '@app/models/question.model';

describe('HistoricalFigureComponent', () => {
  let component: HistoricalFigureComponent;
  let fixture: ComponentFixture<HistoricalFigureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: QuizzService,
          useValue: {
            getQuestions: () => of([]),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HistoricalFigureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch questions on init and initialize state', () => {
    const questionsMock: QuestionModel[] = [
      { id: '1', image: 'figure1.png', choices: ['Jean', 'Michel'], correctAnswer: 'Jean' },
      { id: '2', image: 'figure2.png', choices: ['Marcel', 'Denis'], correctAnswer: 'Denis' },
    ];

    const quizzService = TestBed.inject(QuizzService);
    jest.spyOn(quizzService, 'getQuestions').mockReturnValue(of(questionsMock));

    component.ngOnInit();

    expect(quizzService.getQuestions).toHaveBeenCalledWith('figures/questions');
    expect(component['questions']).toEqual(questionsMock);
    expect(component['questionStatuses']).toEqual(['pending', 'pending']);
    expect(component['currentQuestionIndex']).toBe(0);
    expect(component['currentQuestion']).toEqual(questionsMock[0]);
  });

  it('should track choices by value', () => {
    expect(component.trackByChoice(0, 'Einstein')).toBe('Einstein');
  });
});
