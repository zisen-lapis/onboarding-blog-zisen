import { Routes } from '@angular/router';
import { ListComponent} from "./list/list.component";
import {PostOneComponent} from "./post-one/post-one.component";
import {PostTwoComponent} from "./post-two/post-two.component";
import {ProfileComponent} from "./profile/profile.component";


export const routes: Routes = [
  { path: 'profile', component: ProfileComponent},
  { path: 'post-two', component: PostTwoComponent},
  { path: 'post-one', component: PostOneComponent},
  { path: 'list', component: ListComponent},
  { path:'', redirectTo: 'list', pathMatch: 'full'},
];
