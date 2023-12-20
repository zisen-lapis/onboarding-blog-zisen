import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import {
  PROFILE_FEATURE_KEY,
  profileReducer,
} from '../profile/profile.reducer';
import { blogReducer, BLOGS_FEATURE_KEY } from '../blogs/blogs.reducer';
import { storageMetaReducer } from './storage.metareducer';

export interface State {}

export const reducers: ActionReducerMap<State> = {
  [PROFILE_FEATURE_KEY]: profileReducer,
  [BLOGS_FEATURE_KEY]: blogReducer,
};

export const metaReducers: MetaReducer<State>[] = [storageMetaReducer];
