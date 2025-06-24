import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EasterEggModalComponent} from './easter-egg-modal.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EasterEggModalData } from './easter-egg-modal-data.type';

describe('EasterEggModalComponent', () => {
  let component: EasterEggModalComponent;
  let fixture: ComponentFixture<EasterEggModalComponent>;

  const modalData: EasterEggModalData = {
    image: 'test.png',
    text: 'just a test',
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EasterEggModalComponent],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: modalData
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EasterEggModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
