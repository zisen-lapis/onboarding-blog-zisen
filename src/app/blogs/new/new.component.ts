import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {Store} from "@ngrx/store";
import {newBlog} from "../../store/actions/blog.action";

@Component({
  selector: 'app-new',
  standalone: true,
  imports: [
      ReactiveFormsModule
  ],
  templateUrl: './new.component.html',
  styleUrl: './new.component.scss'
})
export class NewComponent {
  private fb = inject(FormBuilder);
  private store = inject(Store);

  profile$ = this.store.select('profile');
  author = '';
  blogPostForm = this.fb.group({
    title: [''],
    content: ['']
  });



  onSubmit() {
    // get user's name from storage
    this.profile$.subscribe((profile) => {
      this.author = profile.name;
    });
    // dispatch new blog action
    this.store.dispatch(newBlog(
        {
          title: this.blogPostForm.get('title')?.value??'',
          content: this.blogPostForm.get('content')?.value??'',
          editedTime: new Date(),
          id : 0,
          author: this.author,
        }
    ));
    // pop up a message

  }
}
