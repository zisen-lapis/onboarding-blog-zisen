import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-post-two',
  standalone: true,
    imports: [
        RouterLink
    ],
  templateUrl: './post-two.component.html',
  styleUrl: './post-two.component.scss'
})
export class PostTwoComponent {

}
