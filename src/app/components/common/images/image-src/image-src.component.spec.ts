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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
