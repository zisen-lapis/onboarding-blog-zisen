import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AsyncPipe, DatePipe, NgIf, SlicePipe } from '@angular/common';
import {
  selectFeatureBlogs,
  selectFetched,
  selectViewStatus,
} from '../blogs.selectors';
import { LetDirective } from '@ngrx/component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { fetchBlogs } from '../blogs.action';
import { MatButtonModule } from '@angular/material/button';
import { IProfile } from '../../profile/profile.interface';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { IBlogsState, ViewStatus } from '../blogs';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    AsyncPipe,
    LetDirective,
    RouterOutlet,
    SlicePipe,
    DatePipe,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    NgIf,
    MatProgressSpinnerModule,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  private blogStore = inject(Store<IBlogsState>);
  private profileStore = inject(Store<IProfile>);
  blogs$ = this.blogStore.select(selectFeatureBlogs);
  profile$ = this.profileStore.select('profile');
  viewState$ = this.blogStore.select(selectViewStatus);
  fetchedBlogs$ = this.blogStore.select(selectFetched);

  fetchBlogs() {
    this.blogStore.dispatch(fetchBlogs());
  }

  ngOnInit() {
    this.fetchBlogs();
  }

  protected readonly ViewStatus = ViewStatus;
}
