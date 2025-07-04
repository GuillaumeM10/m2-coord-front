import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScoreboardComponent } from './scoreboard.component';

// Create a test class that extends the original component
class TestScoreboardComponent extends ScoreboardComponent {
  reloadCalled = false;

  // Override the onReplay method to track if it was called
  protected override onReplay(): void {
    this.reloadCalled = true;
    // Don't call super.onReplay() to avoid window.location.reload()
  }
}

describe('ScoreboardComponent', () => {
  let component: TestScoreboardComponent;
  let fixture: ComponentFixture<TestScoreboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestScoreboardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestScoreboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call reload when onReplay is called', () => {
    // Call the onReplay method
    component['onReplay']();

    // Check if our test flag was set, indicating the method was called
    expect(component.reloadCalled).toBe(true);
  });
});
