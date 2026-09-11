import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
// app.config.ts
import { provideAnimations } from '@angular/platform-browser/animations';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
// add provideAnimations() to providers — ng-bootstrap modal animations need it
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {authInterceptorInterceptor} from './core/interceptors/auth-interceptor-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([authInterceptorInterceptor])
    ),
    provideBrowserGlobalErrorListeners(),
    provideAnimationsAsync(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

  ]
};
