import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbstractQuizzComponent } from './abstract-quizz';

describe('AbstractQuizzComponent', () => {
  let component: AbstractQuizzComponent;
  let fixture: ComponentFixture<AbstractQuizzComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbstractQuizzComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AbstractQuizzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
