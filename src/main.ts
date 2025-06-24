import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from '@app/app.config';
import { AppComponent } from '@app/app.component';
import * as Sentry from '@sentry/angular';
import { environment } from '@environments/environment';

Sentry.init({
  dsn: `${environment.sentry_dsn}`,
  sendDefaultPii: true,
});

bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));
