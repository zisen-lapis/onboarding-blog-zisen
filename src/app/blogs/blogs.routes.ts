import { Routes } from '@angular/router';
export const BLOGS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./blogs.component').then(m => m.BlogsComponent),
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./new/new.component').then(m => m.NewComponent),
  },

  {
    path: 'list',
    loadComponent: () =>
      import('./list/list.component').then(m => m.ListComponent),
  },
  {
    path: 'list/:id',
    loadComponent: () =>
      import('./page/page.component').then(m => m.PageComponent),
  },
];
