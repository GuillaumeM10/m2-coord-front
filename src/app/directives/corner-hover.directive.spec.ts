import {CornerHoverDirective} from './corner-hover.directive';
import {EasterEggService} from '@app/services/easter-egg/easter-egg.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {EasterEggModalComponent} from '@app/components/modals/easter-egg-modal/easter-egg-modal.component';
import {of, Subject, from} from 'rxjs';

describe('CornerHoverDirective', () => {
  let directive: CornerHoverDirective;
  let easterEggService: jest.Mocked<EasterEggService>;
  let matDialog: jest.Mocked<MatDialog>;
  let mockDialogRef: jest.Mocked<MatDialogRef<EasterEggModalComponent>>;
  let afterClosedSubject: Subject<void>;

  beforeEach(() => {
    // Création du Subject simulant le afterClosed()
    afterClosedSubject = new Subject<void>();

    // EasterEggService spy
    easterEggService = {
      isCtrlPressed: jest.fn()
    } as unknown as jest.Mocked<EasterEggService>;

    // MatDialogRef spy
    mockDialogRef = {
      afterClosed: jest.fn().mockReturnValue(afterClosedSubject.asObservable())
    } as unknown as jest.Mocked<MatDialogRef<EasterEggModalComponent>>;

    // MatDialog spy
    matDialog = {
      open: jest.fn().mockReturnValue(mockDialogRef)
    } as unknown as jest.Mocked<MatDialog>;

    // Instanciation de la directive
    directive = new CornerHoverDirective(
      easterEggService,
      matDialog,
    );

    // Fixer la taille de la fenêtre
    Object.defineProperty(window, 'innerWidth', {writable: true, configurable: true, value: 1000});
    Object.defineProperty(window, 'innerHeight', {writable: true, configurable: true, value: 800});
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  describe('cursorIsInCorner()', () => {
    const ratio = 0.95;
    it('returns true when pointer is in the top-right corner', () => {
      const event = {clientX: 1000 * ratio + 1, clientY: 800 * (1 - ratio) - 1} as MouseEvent;
      expect((directive as any).cursorIsInCorner(event)).toBe(true);
    });

    it('returns false when X is too small', () => {
      const event = {clientX: 1000 * ratio - 10, clientY: 10} as MouseEvent;
      expect((directive as any).cursorIsInCorner(event)).toBe(false);
    });

    it('returns false when Y is too large', () => {
      const event = {clientX: 1000 * ratio + 1, clientY: 800 * (1 - ratio) + 10} as MouseEvent;
      expect((directive as any).cursorIsInCorner(event)).toBe(false);
    });
  });

  describe('onMouseMove()', () => {
    let cornerEvent: MouseEvent;
    let nonCornerEvent: MouseEvent;

    beforeEach(() => {
      const ratio = 0.95;
      cornerEvent = {clientX: 1000 * ratio + 1, clientY: 800 * (1 - ratio) - 1} as MouseEvent;
      nonCornerEvent = {clientX: 100, clientY: 100} as MouseEvent;
      jest.clearAllMocks();
    });

    it('does nothing if cursor is not in the corner', () => {
      directive['onMouseMove'](nonCornerEvent);
      expect(easterEggService.isCtrlPressed).not.toHaveBeenCalled();
      expect(matDialog.open).not.toHaveBeenCalled();
    });

    it('does not open modal if Ctrl is not pressed', () => {
      easterEggService.isCtrlPressed.mockReturnValue(of(false));
      directive['onMouseMove'](cornerEvent);
      expect(easterEggService.isCtrlPressed).toHaveBeenCalled();
      expect(matDialog.open).not.toHaveBeenCalled();
    });

    it('opens modal when in corner and Ctrl pressed', () => {
      easterEggService.isCtrlPressed.mockReturnValue(of(true));
      directive['onMouseMove'](cornerEvent);

      expect(easterEggService.isCtrlPressed).toHaveBeenCalledTimes(1);
      expect(matDialog.open).toHaveBeenCalledWith(
        EasterEggModalComponent,
        {
          height: '410px',
          width: '400px',
          data: {
            image: 'rickroll.gif',
            text: 'Vous avez été rickrolled !',
          },
        }
      );
      expect((directive as any).modalIsOpen).toBe(true);
    });

    it('only opens once if called multiple times without closing', () => {
      easterEggService.isCtrlPressed.mockReturnValue(of(true));
      directive['onMouseMove'](cornerEvent);
      directive['onMouseMove'](cornerEvent);

      expect(matDialog.open).toHaveBeenCalledTimes(1);
    });

    it('resets modalIsOpen to false after close', () => {
      easterEggService.isCtrlPressed.mockReturnValue(of(true));
      directive['onMouseMove'](cornerEvent);
      expect((directive as any).modalIsOpen).toBe(true);

      afterClosedSubject.next();
      expect((directive as any).modalIsOpen).toBe(false);
    });

    it('handles a stream false then true (filter + take)', () => {
      easterEggService.isCtrlPressed.mockReturnValue(from([false, true]));
      directive['onMouseMove'](cornerEvent);

      expect(matDialog.open).toHaveBeenCalledTimes(1);
    });
  });

  describe('openEasterEggModal()', () => {
    it('opens dialog with correct config and sets modalIsOpen', () => {
      const ref = (directive as any).openEasterEggModal() as MatDialogRef<EasterEggModalComponent>;
      expect(matDialog.open).toHaveBeenCalledWith(
        EasterEggModalComponent,
        {
          height: '410px',
          width: '400px',
          data: {
            image: 'rickroll.gif',
            text: 'Vous avez été rickrolled !',
          },
        }
      );
      expect(ref).toBe(mockDialogRef);
      expect((directive as any).modalIsOpen).toBe(true);
    });
  });

  describe('openModalIfNot()', () => {
    it('opens only if modalIsOpen is false', () => {
      (directive as any).modalIsOpen = false;
      (directive as any).openModalIfNot();
      expect(matDialog.open).toHaveBeenCalledTimes(1);

      matDialog.open.mockClear();
      (directive as any).modalIsOpen = true;
      (directive as any).openModalIfNot();
      expect(matDialog.open).not.toHaveBeenCalled();
    });
  });
});
