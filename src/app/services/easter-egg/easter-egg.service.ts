import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EasterEggService {
  private ctrlPressed$ = new BehaviorSubject<boolean>(false);

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('keydown', e => {
        if (e.key === 'Control') this.ctrlPressed$.next(true);
      });
      window.addEventListener('keyup', e => {
        if (e.key === 'Control') this.ctrlPressed$.next(false);
      });
    }
  }

  public isCtrlPressed(): Observable<boolean> {
    return this.ctrlPressed$.asObservable();
  }
}
