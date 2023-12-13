import {Component, inject} from '@angular/core';
import {Store} from "@ngrx/store";
import {selectBlogWithID} from "../../store/selectors/blogs.selectors";
import {ActivatedRoute} from "@angular/router";
import {Observable, Subscription} from "rxjs";
import {IBlogs} from "../blogs.interface";
import {LetDirective} from "@ngrx/component";
import {AsyncPipe, NgIf} from "@angular/common";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {updateBlog} from "../../store/actions/blog.action";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-page',
  standalone: true,
    imports: [
        LetDirective,
        AsyncPipe,
        NgIf,
        ReactiveFormsModule,
        MatButtonModule
    ],
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss'
})
export class PageComponent {
 private store = inject(Store);
 private route = inject(ActivatedRoute);
 private fb = inject(FormBuilder);

 blog = this.fb.group({
        title: [''],
        content: [''],
        id: [0],
        editedTime: [new Date()],
        author: ['']
    })

 blog$ = new Observable<IBlogs | undefined>();
 private sub: Subscription = new Subscription();
 isEditing: boolean = false;
 ngOnInit(): void {
    this.sub = this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id !== null && id !== undefined && id !== '') {
          this.blog$ = this.store.select(selectBlogWithID({id: parseInt(id)}));
      }
    });
    console.log("hello");
 }
 
 ngOnDestroy(): void {
    this.sub.unsubscribe();
 }

    updateBlog() {
     this.isEditing = false;
     this.store.dispatch(updateBlog({
         title: this.blog.value.title?? '',
         content: this.blog.value.content?? '',
         id: this.blog.value.id?? 0,
         editedTime: this.blog.value.editedTime?? new Date(),
         author: this.blog.value.author?? ''
     }));
    }

    editBlog() {
     if (this.isEditing){
         return;
     }

     this.blog$.subscribe((blog) => {
            this.blog.patchValue(blog??{title:'',content:''});
     });

     this.isEditing = true;
    }
}
