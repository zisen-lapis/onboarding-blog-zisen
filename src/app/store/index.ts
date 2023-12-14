import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { profileReducer } from './reducers/profile.reducer';
import { IProfile } from '../profile/profile.interface';
import { IBlogs } from '../blogs/blogs.interface';
import { blogReducer } from './reducers/blogs.reducer';
import { storageMetaReducer } from './reducers/storage.metareducer';

export interface State {
  profile: IProfile;
  blogs: {
    upcomingId: number;
    blogs: IBlogs[];
  };
}

export const reducers: ActionReducerMap<State> = {
  profile: profileReducer,
  blogs: blogReducer,
};

export const metaReducers: MetaReducer<State>[] = [storageMetaReducer];
