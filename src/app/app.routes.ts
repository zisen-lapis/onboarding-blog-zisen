import { Routes } from '@angular/router';
import { ListComponent} from "./list/list.component";
import {PostOneComponent} from "./post-one/post-one.component";
import {PostTwoComponent} from "./post-two/post-two.component";
import {ProfileComponent} from "./profile/profile.component";


export const routes: Routes = [
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
  { path: 'list', component: ListComponent},
  { path:'', redirectTo: 'list', pathMatch: 'full'},
];
