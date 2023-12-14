import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { reducers, metaReducers } from './store';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideEffects } from '@ngrx/effects';
import { BlogsEffects } from './store/effects/blogs.effects';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  // provide httpClient
  providers: [
    provideRouter(routes),
    provideStore(reducers, { metaReducers }),
    provideAnimations(),
    provideHttpClient(),
    provideEffects(BlogsEffects),
  ],
};
