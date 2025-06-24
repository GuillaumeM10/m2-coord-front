import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerNotificationComponent } from './answer-notification.component';

describe('AnswerNotificationComponent', () => {
  let component: AnswerNotificationComponent;
  let fixture: ComponentFixture<AnswerNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnswerNotificationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AnswerNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
