import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlagsComponent } from './flags.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { QuizzService } from '../../../services/quizz/quizz.service';
import { of } from 'rxjs';

describe('FlagsComponent', () => {
  let component: FlagsComponent;
  let fixture: ComponentFixture<FlagsComponent>;

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

    fixture = TestBed.createComponent(FlagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
