import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-post-one',
  standalone: true,
    imports: [
        RouterLink,
        MatButtonModule
    ],
  templateUrl: './post-one.component.html',
  styleUrl: './post-one.component.scss'
})
export class PostOneComponent {

  protected readonly addEventListener = addEventListener;
}
