import { Component } from '@angular/core';
import { RouterOutlet, RouterLinkActive, RouterLink} from "@angular/router";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    CommonModule
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  blogPosts = [
    {
      title: 'Post 1',
      content: 'This is the first post\'s content.',
      publishedDate: '2021-01-01',
      link: '/post-one'
    },
    {
      title: 'Post 2',
      content: 'This is the second post\'s content.',
      publishedDate: '2021-01-02',
      link: '/post-two'
    },
  ];


}
