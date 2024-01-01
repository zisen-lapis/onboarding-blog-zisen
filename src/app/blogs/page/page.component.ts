import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectBlogById, selectFetchedById } from '../blogs.selectors';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { IBlogs, IBlogsState } from '../blogs';
import { LetDirective } from '@ngrx/component';
import { AsyncPipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { updateBlog } from '../blogs.action';
import { MatButtonModule } from '@angular/material/button';
import { isNilOrEmpty } from '../../ramda-functions';
import { isNil } from 'rambda';
// import { isNilOrEmpty } from '../../ramda-functions';
// import { isNilOrEmpty } from '@ngrx/component';
@Component({
  selector: 'app-page',
  standalone: true,
  imports: [LetDirective, AsyncPipe, ReactiveFormsModule, MatButtonModule],
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss',
})
export class PageComponent implements OnInit, OnDestroy {
  private blogStore = inject(Store<IBlogsState>);
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);

  blog = this.fb.group({
    title: [''],
    content: [''],
    id: [''],
    editedTime: [new Date()],
    author: [''],
  });

  blog$!: Observable<IBlogs | undefined>;
  private sub: Subscription = new Subscription();
  isEditing: boolean = false;
  ngOnInit(): void {
    this.sub = this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (!isNilOrEmpty(id!)) {
        // if (id !== null && id !== '') {
        this.blog$ = this.blogStore.select(selectBlogById({ id: id! }));
      }
      // check if the blog$ has value
      this.blog$.subscribe(blog => {
        if (isNil(blog) || isNilOrEmpty(blog?.id ?? '')) {
          this.blog$ = this.blogStore.select(selectFetchedById({ id: id! }));
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  updateBlog() {
    this.isEditing = false;
    const change: IBlogs = {
      title: this.blog.value.title ?? '',
      content: this.blog.value.content ?? '',
      id: this.blog.value.id ?? '',
      editedTime: this.blog.value.editedTime ?? new Date(),
      author: this.blog.value.author ?? '',
    };
    this.blogStore.dispatch(
      updateBlog({
        id: change.id ?? '',
        changes: change,
      })
    );
  }

  editBlog() {
    if (this.isEditing) {
      return;
    }

    this.blog$.subscribe(blog => {
      this.blog.patchValue(blog ?? { title: '', content: '' });
    });

    this.isEditing = true;
  }
}
