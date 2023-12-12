import {Component, inject} from '@angular/core';
import {Store} from "@ngrx/store";
import {AsyncPipe, DatePipe, NgForOf, SlicePipe} from "@angular/common";
import {selectFeatureBlogs} from "../../store/selectors/blogs.selectors";
import {LetDirective} from "@ngrx/component";
import {RouterLink, RouterOutlet} from "@angular/router";

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
        RouterLink
    ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  private store = inject(Store);
  blogs$ = this.store.select(selectFeatureBlogs);
  profile$ = this.store.select('profile');
}
