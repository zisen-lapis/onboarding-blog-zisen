import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { returnError, updateBlogs } from '../actions/blog.action';
import { IBlogs } from '../../blogs/blogs.interface';

@Injectable()
export class BlogsEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient
  ) {}
  url = 'http://localhost:3000/api/blogs';

  getBlogsEffects = createEffect(() =>
    this.actions$.pipe(
      ofType('[Blogs] Get Blogs'), // check if the action is query role id
      switchMap(() =>
        this.http.get(this.url).pipe(
          // send request
          // go to the next action after return
          map(data => updateBlogs({ blogs: data as IBlogs[] })),
          catchError(err => of(returnError({ error: err })))
        )
      )
    )
  );
}
