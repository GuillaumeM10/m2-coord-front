import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SmallButtonComponent } from './small-button.component';

describe('SmallButtonComponent', () => {
  let component: SmallButtonComponent;
  let fixture: ComponentFixture<SmallButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmallButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SmallButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit click event when button is clicked', () => {
    // Arrange
    const spy = jest.spyOn(component.clickEmitter, 'emit');
    const buttonElement = fixture.debugElement.query(By.css('button'));

    // Act
    buttonElement.nativeElement.click();

    // Assert
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should call onClickButton method when button is clicked', () => {
    // Arrange
    const spy = jest.spyOn(component, 'onClickButton');
    const buttonElement = fixture.debugElement.query(By.css('button'));

    // Act
    buttonElement.nativeElement.click();

    // Assert
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should pass MouseEvent to the emitter when clicked', () => {
    // Arrange
    const spy = jest.spyOn(component.clickEmitter, 'emit');
    const buttonElement = fixture.debugElement.query(By.css('button'));

    // Act
    buttonElement.triggerEventHandler('click', { type: 'click' });

    // Assert
    expect(spy).toHaveBeenCalledWith({ type: 'click' });
  });

  it('should display the label correctly', () => {
    // Arrange
    const testLabel = 'Test Button';
    component.label = testLabel;

    // Act
    fixture.detectChanges();

    // Assert
    const buttonElement = fixture.debugElement.query(By.css('button'));
    expect(buttonElement.nativeElement.textContent.trim()).toBe(testLabel);
  });

  it('should set button type correctly', () => {
    // Arrange
    component.type = 'submit';

    // Act
    fixture.detectChanges();

    // Assert
    const buttonElement = fixture.debugElement.query(By.css('button'));
    expect(buttonElement.nativeElement.type).toBe('submit');
  });

  it('should set disabled state correctly', () => {
    // Arrange
    component.disabled = true;

    // Act
    fixture.detectChanges();

    // Assert
    const buttonElement = fixture.debugElement.query(By.css('button'));
    expect(buttonElement.nativeElement.disabled).toBe(true);
  });
});
