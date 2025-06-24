import { Directive, HostListener } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EasterEggModalComponent } from '@app/components/modals/easter-egg-modal/easter-egg-modal.component';
import { EasterEggService } from '@app/services/easter-egg/easter-egg.service';
import { filter, take } from 'rxjs';
import { EasterEggModalData } from '@app/components/modals/easter-egg-modal/easter-egg-modal-data.type';

@Directive({
  selector: '[appCornerHover]',
})
export class CornerHoverDirective {
  private cornerRatio: number = 0.95;

  private modalIsOpen: boolean = false;
  private modalHeight: number = 410;
  private modalWidth: number = 400;
  private dataModal: EasterEggModalData = {
    image: 'rickroll.gif',
    text: 'Vous avez été rickrolled !',
  };

  constructor(
    private easterEggService: EasterEggService,
    private dialog: MatDialog,
  ) {
  }

  private cursorIsInCorner(event: MouseEvent): boolean {
    return event.clientX > window.innerWidth * this.cornerRatio
      && event.clientY < window.innerHeight * (1 - this.cornerRatio)
  }

  @HostListener('document:mousemove', ['$event'])
  private onMouseMove(event: MouseEvent): void {
    if (!this.cursorIsInCorner(event)) return;
    this.easterEggService
      .isCtrlPressed()
      .pipe(
        filter(ctrl => ctrl),
        take(1),
      )
      .subscribe(() => {
        this.openModalIfNot();
      });
  }

  private openEasterEggModal(): MatDialogRef<EasterEggModalComponent> {
    const modalRef: MatDialogRef<EasterEggModalComponent> = this.dialog.open(
      EasterEggModalComponent,
      {
        height: this.modalHeight + 'px',
        width: this.modalWidth + 'px',
        data: this.dataModal,
      },
    );
    this.modalIsOpen = true;
    return modalRef;
  }

  private openModalIfNot(): void {
    if (this.modalIsOpen) return;
    const modalRef: MatDialogRef<EasterEggModalComponent> = this.openEasterEggModal();
    modalRef.afterClosed().subscribe(() => {
      this.modalIsOpen = false;
    });
  }
}
