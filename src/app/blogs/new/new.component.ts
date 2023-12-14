import { Component, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { Store } from "@ngrx/store";
import { newBlog } from "../../store/actions/blog.action";
import { MatButtonModule } from "@angular/material/button";
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from "@angular/material/dialog";
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: "app-new",
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule],
  templateUrl: "./new.component.html",
  styleUrl: "./new.component.scss",
})
export class NewComponent {
  private fb = inject(FormBuilder);
  private store = inject(Store);
  private dialog = inject(MatDialog);
  private router = inject(Router);

  profile$ = this.store.select("profile");
  author = "";
  blogPostForm = this.fb.group({
    title: [""],
    content: [""],
  });

  onSubmit() {
    // get user's name from storage
    this.profile$.subscribe((profile) => {
      this.author = profile.name;
    });
    // dispatch new blog action
    this.store.dispatch(
      newBlog({
        title: this.blogPostForm.get("title")?.value ?? "",
        content: this.blogPostForm.get("content")?.value ?? "",
        editedTime: new Date(),
        id: 0,
        author: this.author,
      }),
    );
    // alert("Blog created successfully!")
    // pop up a message
    this.openDialog("100ms", "100ms");

    // redirect to blogs
    setTimeout(() => {
      this.dialog.closeAll();
      this.router.navigate(["/blogs/list"]).then();
    }, 2000);
  }
  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
  ): void {
    this.dialog.open(DialogAnimationsExampleDialogComponent, {
      width: "400px",
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}

@Component({
  selector: "app-dialog-animations-example-dialog",
  templateUrl: "dialog-animations-example-dialog.html",
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
export class DialogAnimationsExampleDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogAnimationsExampleDialogComponent>,
  ) {}
}
