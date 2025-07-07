import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImageSrcComponent } from './image-src.component';

describe('ImageSrcComponent', () => {
  let component: ImageSrcComponent;
  let fixture: ComponentFixture<ImageSrcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageSrcComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ImageSrcComponent);
    component = fixture.componentInstance;

    // Set a default src value before calling detectChanges
    // to avoid NgOptimizedImage validation error
    component.src = 'default-test.png';

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('src setter', () => {
    it('should keep the path as is when it already includes the imagesFolder', () => {
      const fullPath = '/images/test-image.png';
      component.src = fullPath;
      expect(component.src).toBe(fullPath);
    });

    it('should prepend imagesFolder when path starts with a slash', () => {
      const path = '/test-image.png';
      component.src = path;
      expect(component.src).toBe('/images/test-image.png');
    });

    it('should prepend imagesFolder with slash when path does not start with a slash', () => {
      const path = 'test-image.png';
      component.src = path;
      expect(component.src).toBe('/images/test-image.png');
    });

    it('should handle empty string input', () => {
      component.src = '';
      expect(component.src).toBe('/images/');
    });

    it('should handle multiple assignments', () => {
      // First set a regular path
      component.src = 'test1.png';
      expect(component.src).toBe('/images/test1.png');

      // Then set a path that already has the images folder
      component.src = '/images/test2.png';
      expect(component.src).toBe('/images/test2.png');

      // Then set a path with leading slash
      component.src = '/test3.png';
      expect(component.src).toBe('/images/test3.png');
    });

    it('should not duplicate the imagesFolder path when set multiple times', () => {
      component.src = 'test.png';
      expect(component.src).toBe('/images/test.png');

      // Set the same path again
      component.src = 'test.png';
      expect(component.src).toBe('/images/test.png');

      // Ensure it doesn't become /images/images/test.png
      expect(component.src).not.toBe('/images/images/test.png');
    });
  });

  describe('component properties', () => {
    it('should have default values for inputs', () => {
      expect(component.alt).toBe('default alternative text');
      expect(component.height).toBe(100);
      expect(component.width).toBe(100);
      expect(component['loading']).toBe('lazy');
    });
  });
});
