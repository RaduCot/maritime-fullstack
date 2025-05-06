import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { maritimeReducer } from '../maritime-dashboard/state/maritime.reducer';

import { MaritimeEffects } from '../maritime-dashboard/state/maritime.effects';
import { provideEffects } from '@ngrx/effects';

import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore({ maritime: maritimeReducer }),
    provideEffects(MaritimeEffects),
    provideHttpClient(withFetch()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideAnimations(),
  ],
};
