import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { newBlog } from '../blogs.action';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-new',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule],
  templateUrl: './new.component.html',
  styleUrl: './new.component.scss',
})
export class NewComponent {
  private fb = inject(FormBuilder);
  private store = inject(Store);
  private dialog = inject(MatDialog);
  private router = inject(Router);

  profile$ = this.store.select('profile');
  author = '';
  blogPostForm = this.fb.group({
    title: [''],
    content: [''],
  });

  onSubmit() {
    // get user's name from storage
    this.profile$.subscribe(profile => {
      this.author = profile.name;
    });
    // dispatch new blog action
    this.store.dispatch(
      newBlog({
        id: String(Math.random()).slice(2, 10),
        title: this.blogPostForm.get('title')?.value ?? '',
        content: this.blogPostForm.get('content')?.value ?? '',
        editedTime: new Date(),
        author: this.author,
      })
    );
    // alert("Blog created successfully!")
    // pop up a message
    this.openDialog('100ms', '100ms');

    // redirect to blogs
    setTimeout(() => {
      this.dialog.closeAll();
      this.router.navigate(['/blogs/list']).then();
    }, 2000);
  }
  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(DialogAnimationsComponent, {
      width: '400px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}

@Component({
  selector: 'app-dialog-animations',
  templateUrl: 'dialog-animations.html',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    RouterLink,
  ],
})
export class DialogAnimationsComponent {
  constructor(public dialogRef: MatDialogRef<DialogAnimationsComponent>) {}
}
