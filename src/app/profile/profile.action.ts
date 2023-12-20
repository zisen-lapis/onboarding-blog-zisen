import { createAction, props } from '@ngrx/store';
import { IProfile } from './profile.interface';

export const editProfile = createAction(
  '[Profile] Edit Profile',
  props<IProfile>()
);
