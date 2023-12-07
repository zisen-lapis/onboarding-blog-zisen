import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-post-one',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './post-one.component.html',
  styleUrl: './post-one.component.css'
})
export class PostOneComponent {

  protected readonly addEventListener = addEventListener;
}
