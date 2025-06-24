import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistoricalFigureComponent } from './historical-figure.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { QuizzService } from '../../../services/quizz/quizz.service';
import { of } from 'rxjs';

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
});
