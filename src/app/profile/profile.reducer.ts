import { Gender, IProfile } from './profile.interface';
import { createReducer, on } from '@ngrx/store';
import { editProfile } from './profile.action';

export const PROFILE_FEATURE_KEY = 'profile';
export const initialState: IProfile = {
  name: '',
  address: '',
  gender: Gender.Male,
  editTime: new Date(),
};

export const profileReducer = createReducer(
  initialState,
  on(editProfile, (state, action) => ({ ...state, ...action }))
);
