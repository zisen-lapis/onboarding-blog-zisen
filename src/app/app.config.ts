import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { reducers, metaReducers } from './store';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideEffects } from '@ngrx/effects';
import { BlogsEffects } from './blogs/blogs.effects';
import { provideHttpClient } from '@angular/common/http';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  // provide httpClient
  providers: [
    provideRouter(routes),
    provideStore(reducers, { metaReducers }),
    provideAnimations(),
    provideHttpClient(),
    provideEffects(BlogsEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
],
};
