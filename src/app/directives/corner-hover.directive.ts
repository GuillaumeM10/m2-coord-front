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
  private modalIsOpen: boolean = false;
  private modalWidth: number = 400;
  private dataModal: EasterEggModalData = {
    image: 'rickroll.gif',
    text: 'Vous avez été rickrolled !',
  };

  constructor(
    private easterEggService: EasterEggService,
    private dialog: MatDialog,
  ) {}

  @HostListener('document:mousemove', ['$event'])
  private onMouseMove(event: MouseEvent): void {
    const inCorner =
      event.clientX > window.innerWidth * 0.95 && event.clientY < window.innerHeight * 0.05;

    if (inCorner) {
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
  }

  private openEasterEggModal(): MatDialogRef<EasterEggModalComponent> {
    const modalRef: MatDialogRef<EasterEggModalComponent> = this.dialog.open(
      EasterEggModalComponent,
      {
        width: this.modalWidth + 'px',
        data: this.dataModal,
      },
    );
    this.modalIsOpen = true;
    return modalRef;
  }

  private openModalIfNot(): void {
    if (!this.modalIsOpen) {
      const modalRef: MatDialogRef<EasterEggModalComponent> = this.openEasterEggModal();
      modalRef.afterClosed().subscribe(() => {
        this.modalIsOpen = false;
      });
    }
  }
}
