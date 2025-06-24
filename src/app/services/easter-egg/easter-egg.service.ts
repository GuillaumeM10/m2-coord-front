import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { EventKeyEnum } from '@app/enums/event-key.enum';

@Injectable({
  providedIn: 'root',
})
export class EasterEggService {
  private readonly ctrlPressed$ = new BehaviorSubject<boolean>(false);

  constructor(@Inject(PLATFORM_ID) private readonly platformId: object) {
    if (!isPlatformBrowser(this.platformId)) return;
    window.addEventListener('keydown', e => {
      if (e.key === EventKeyEnum.CONTROL) this.ctrlPressed$.next(true);
    });
    window.addEventListener('keyup', e => {
      if (e.key === EventKeyEnum.CONTROL) this.ctrlPressed$.next(false);
    });
  }

  public isCtrlPressed(): Observable<boolean> {
    return this.ctrlPressed$.asObservable();
  }
}
