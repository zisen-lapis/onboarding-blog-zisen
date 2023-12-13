import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-post-two',
  standalone: true,
    imports: [
        RouterLink,
        MatButtonModule
    ],
  templateUrl: './post-two.component.html',
  styleUrl: './post-two.component.scss'
})
export class PostTwoComponent {

}
