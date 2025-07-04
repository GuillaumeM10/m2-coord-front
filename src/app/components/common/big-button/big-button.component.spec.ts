import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BigButtonComponent } from './big-button.component';
import { By } from '@angular/platform-browser';

describe('BigButtonComponent', () => {
  let component: BigButtonComponent;
  let fixture: ComponentFixture<BigButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BigButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BigButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onClickButton', () => {
    it('should emit an event when onClickButton is called directly', () => {
      // Create a spy on the clickEmitter
      const emitterSpy = jest.spyOn(component.clickEmitter, 'emit');

      // Create a mock MouseEvent
      const mockEvent = new MouseEvent('click');

      // Call the method directly
      component['onClickButton'](mockEvent);

      // Verify the emitter was called with the mock event
      expect(emitterSpy).toHaveBeenCalledWith(mockEvent);
      expect(emitterSpy).toHaveBeenCalledTimes(1);
    });

    it('should emit clickEmitter when button is clicked', () => {
      // Create a spy on the clickEmitter
      const emitterSpy = jest.spyOn(component.clickEmitter, 'emit');

      // Set button properties
      component.label = 'Test Button';
      fixture.detectChanges();

      // Get the button element
      const buttonElement = fixture.debugElement.query(By.css('button'));

      // Simulate a click on the button
      buttonElement.nativeElement.click();

      // Verify the emitter was called
      expect(emitterSpy).toHaveBeenCalledTimes(1);
      expect(emitterSpy).toHaveBeenCalledWith(expect.any(MouseEvent));
    });

    it('should not emit clickEmitter when button is disabled', () => {
      // Create a spy on the clickEmitter
      const emitterSpy = jest.spyOn(component.clickEmitter, 'emit');

      // Set button properties including disabled
      component.label = 'Disabled Button';
      component.disabled = true;
      fixture.detectChanges();

      // Get the button element
      const buttonElement = fixture.debugElement.query(By.css('button'));

      // Verify button is disabled
      expect(buttonElement.nativeElement.disabled).toBe(true);

      // Try to click the disabled button (this shouldn't emit the event)
      buttonElement.nativeElement.click();

      // Verify the emitter was not called
      expect(emitterSpy).not.toHaveBeenCalled();
    });

    it('should handle different button types', () => {
      // Test submit type
      component.type = 'submit';
      fixture.detectChanges();

      const submitButton = fixture.debugElement.query(By.css('button[type="submit"]'));
      expect(submitButton).toBeTruthy();

      // Test button type (default)
      component.type = 'button';
      fixture.detectChanges();

      const regularButton = fixture.debugElement.query(By.css('button[type="button"]'));
      expect(regularButton).toBeTruthy();
    });

    it('should display the correct label', () => {
      const testLabel = 'Click Me!';
      component.label = testLabel;
      fixture.detectChanges();

      const buttonElement = fixture.debugElement.query(By.css('button'));
      expect(buttonElement.nativeElement.textContent.trim()).toBe(testLabel);
    });
  });
});
