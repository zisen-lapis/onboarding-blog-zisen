import {Component, inject} from '@angular/core';
import {Store} from "@ngrx/store";
import {AsyncPipe, DatePipe, NgForOf, SlicePipe} from "@angular/common";
import {selectFeatureBlogs} from "../../store/selectors/blogs.selectors";
import {LetDirective} from "@ngrx/component";
import {RouterLink, RouterOutlet} from "@angular/router";
import {MatCardModule} from "@angular/material/card";

@Component({
  selector: 'app-list',
  standalone: true,
    imports: [
        NgForOf,
        AsyncPipe,
        LetDirective,
        RouterOutlet,
        SlicePipe,
        DatePipe,
        RouterLink,
        MatCardModule
    ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  private store = inject(Store);
  blogs$ = this.store.select(selectFeatureBlogs);
  profile$ = this.store.select('profile');

  blogPosts = [
    {
            title: 'Post 1',
            content: '3. Sign in with Apple ID: ...',
            publishedDate: '2021-01-01',
            link: '/post-one'
        },
        {
            title: 'Post 2',
            content: '4. Configure iMessage: ...',
            publishedDate: '2021-01-02',
            link: '/post-two'
        },
      {
          title: 'Post 3',
          content: '4. Configure iMessage: ...',
          publishedDate: '2021-01-02',
          link: '/post-two'
      },
    ];
}
