import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EasterEggModalComponent } from './easter-egg-modal.component';

describe('EasterEggModalComponent', () => {
  let component: EasterEggModalComponent;
  let fixture: ComponentFixture<EasterEggModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EasterEggModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EasterEggModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
