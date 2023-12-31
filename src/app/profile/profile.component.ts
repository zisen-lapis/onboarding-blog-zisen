import {Component, inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {GenderPipe} from "./gender.pipe";
import {AsyncPipe, DatePipe, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {fromEvent, Observable} from "rxjs"
import {Gender, IProfile} from "./profile.interface";
import {Store} from "@ngrx/store";
import {editProfile} from "../store/actions/profile.action";
import {LetDirective} from "@ngrx/component";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    GenderPipe,
    NgIf,
    RouterLink,
    DatePipe,
    AsyncPipe,
    LetDirective
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  private store = inject(Store);
  private fb = inject(FormBuilder);

  storedProfile$?: Observable<IProfile> = this.store.select('profile');

  isEditing = false;

  profile = this.fb.group(
    {
      name:['',Validators.required],
      address:[''],
      gender: [Gender.Male],
      editTime:[new Date()]
    }
  )

  get editTime() {
    return this.profile.get('editTime')?.value as Date;
  }
  set editTime(value: Date) {
    this.profile.get('editTime')?.setValue(value);
  }
  editProfile() {
    // prevent loading repeatedly while editing
    if (this.isEditing){
      return;
    }

    // load saved data from storage
    this.storedProfile$?.subscribe((profile) => {
      this.profile.patchValue(profile);
    });
    this.isEditing = true;
  }

  finishEdit() {
    this.isEditing = false;
    this.editTime = new Date();
    this.store.dispatch(editProfile(
        {
          name: this.profile.value.name,
          address: this.profile.value.address,
          gender: this.profile.value.gender,
          editTime: this.profile.value.editTime
        }
    ))
  }

  showGender() {
    console.log(this.profile.value.gender)
  }

  fromEvent() {
    fromEvent(document, 'click').subscribe(() => {
      console.log('Clicked!')
    })
  }


  Gender = Gender;
}
