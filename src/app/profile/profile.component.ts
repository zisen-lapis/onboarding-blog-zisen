import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {GenderPipe} from "./gender.pipe";
import {DatePipe, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import { fromEvent} from "rxjs"
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    GenderPipe,
    NgIf,
    RouterLink,
    DatePipe
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  constructor(private fb: FormBuilder){
  }

  edit = false;
  editTime = new Date();
  profile = this.fb.group(
    {
      name:['',Validators.required],
      address:[''],
      gender:[true],
    }
  )

  editProfile() {
    this.edit = true;
  }

  finishEdit() {
    this.edit = false;
    this.editTime = new Date();
  }

  showGender() {
    console.log(this.profile.value.gender)
  }

  fromEvent() {
    fromEvent(document, 'click').subscribe(() => {
      console.log('Clicked!')
    })
  }
}
