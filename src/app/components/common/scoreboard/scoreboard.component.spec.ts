import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScoreboardComponent } from './scoreboard.component';

describe('ScoreboardComponent', () => {
  let component: ScoreboardComponent;
  let fixture: ComponentFixture<ScoreboardComponent>;
  let originalLocation: Location;

  beforeEach(async () => {
    // Store the original window.location
    originalLocation = window.location;

    // Define a custom location object with a mock reload method
    const mockLocation = {
      ...window.location,
      reload: jest.fn()
    };

    // Replace window.location with our mock version using Object.defineProperty
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: mockLocation,
      writable: true
    });

    await TestBed.configureTestingModule({
      imports: [ScoreboardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ScoreboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    // Restore the original window.location
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: originalLocation,
      writable: true
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call window.location.reload when onReplay is called', () => {
    // Call the onReplay method
    component['onReplay']();

    // Check if window.location.reload was called
    expect(window.location.reload).toHaveBeenCalled();
  });
});
