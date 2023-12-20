import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LetDirective } from '@ngrx/component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [RouterOutlet, LetDirective, AsyncPipe],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.scss',
})
export class BlogsComponent {}
