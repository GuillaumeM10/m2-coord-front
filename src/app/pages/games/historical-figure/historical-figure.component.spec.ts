import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricalFigureComponent } from './historical-figure.component';

describe('HistoricalFigureComponent', () => {
  let component: HistoricalFigureComponent;
  let fixture: ComponentFixture<HistoricalFigureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoricalFigureComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HistoricalFigureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
