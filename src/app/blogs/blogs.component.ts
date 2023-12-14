import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { LetDirective } from '@ngrx/component';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { IProfile } from '../profile/profile.interface';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [RouterOutlet, LetDirective, AsyncPipe],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.scss',
})
export class BlogsComponent {
  private store = inject(Store);
  profile$: Observable<IProfile> = this.store.select('profile');
}
