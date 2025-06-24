import { Directive, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EasterEggModalComponent } from '@app/components/modals/easter-egg-modal/easter-egg-modal.component';
import { EasterEggService } from '@app/services/easter-egg/easter-egg.service';
import { filter, take } from 'rxjs';

@Directive({
  selector: '[appCornerHover]',
})
export class CornerHoverDirective {
  constructor(
    private easterEggService: EasterEggService,
    private dialog: MatDialog,
  ) {}

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
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
          this.openEasterEggModal();
        });
    }
  }

  openEasterEggModal() {
    this.dialog.open(EasterEggModalComponent, {
      width: '400px',
      data: {
        image: 'assets/images/cesar.png',
        text: '🎉 Bravo, vous avez trouvé l’easter egg !',
      },
    });
  }
}
