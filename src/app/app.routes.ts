import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: `map`,
    loadComponent: () =>
      import('./map/map.component').then(m => m.MapComponent),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./profile/profile.component').then(m => m.ProfileComponent),
  },
  {
    path: 'blogs',
    loadChildren: () =>
      import('./blogs/blogs.routes').then(m => m.BLOGS_ROUTES),
  },
  { path: '', redirectTo: 'blogs/list', pathMatch: 'full' },
];
