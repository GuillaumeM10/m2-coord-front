import {ComponentFixture, TestBed} from '@angular/core/testing';
import {GameOptionsDialogComponent} from './game-options-dialog.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {GameDto} from '@api/models/game-dto';

describe('GameOptionsDialogComponent', () => {
  let component: GameOptionsDialogComponent;
  let fixture: ComponentFixture<GameOptionsDialogComponent>;
  let mockDialogRef: jest.Mocked<MatDialogRef<GameOptionsDialogComponent>>;
  const fakeGame: GameDto = {key: 'test-game'} as GameDto;

  beforeEach(async () => {
    mockDialogRef = {
      close: jest.fn(),
    } as unknown as jest.Mocked<MatDialogRef<GameOptionsDialogComponent>>;

    await TestBed.configureTestingModule({
      imports: [GameOptionsDialogComponent],
      providers: [
        {provide: MatDialogRef, useValue: mockDialogRef},
        {provide: MAT_DIALOG_DATA, useValue: fakeGame},
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GameOptionsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('devrait créer le composant', () => {
    expect(component).toBeTruthy();
  });

  it('selectedOption est initialisé à null', () => {
    expect(component.selectedOption).toBeNull();
  });

  describe('play()', () => {
    it('ne ferme pas le dialog si aucune option sélectionnée', () => {
      component.selectedOption = null;
      component.play();
      expect(mockDialogRef.close).not.toHaveBeenCalled();
    });

    it('ferme le dialog avec les bons arguments si une option est sélectionnée', () => {
      component.selectedOption = 'mode1';
      component.play();
      expect(mockDialogRef.close).toHaveBeenCalledWith({
        game: fakeGame.key,
        mode: 'mode1',
      });
    });
  });

  describe('close()', () => {
    it('ferme toujours le dialog sans arguments', () => {
      component.close();
      expect(mockDialogRef.close).toHaveBeenCalledWith();
    });
  });
});
