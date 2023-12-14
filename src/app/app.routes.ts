import { Routes } from '@angular/router';


export const routes: Routes = [
    {
      path:`map`,
        loadComponent: () => import('./map/map.component')
            .then(m => m.MapComponent)
    },
  {
    path: 'profile',
    loadComponent: () => import('./profile/profile.component')
        .then(m => m.ProfileComponent)
  },
  {
    path: 'post-one',
    loadComponent: () => import('./post-one/post-one.component')
            .then(m => m.PostOneComponent)
  },
  {
    path: 'post-two',
    loadComponent: () => import('./post-two/post-two.component')
            .then(m => m.PostTwoComponent)
  },
  {
    path:'blogs',
    loadComponent: () => import('./blogs/blogs.component')
            .then(m => m.BlogsComponent),
    children: [
        {
            path: 'new',
            loadComponent: () => import('./blogs/new/new.component')
                .then(m => m.NewComponent)
        },

        {
            path: 'list',
            loadComponent: () => import('./blogs/list/list.component')
                .then(m => m.ListComponent)
        },
        {
            path: 'list/:id',
            loadComponent: () => import('./blogs/page/page.component')
                .then(m => m.PageComponent)
        }
        ]
  },
  { path:'', redirectTo: 'blogs/list', pathMatch: 'full'},
];
