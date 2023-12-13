import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import {profileReducer} from "./reducers/profile.reducer";
import {IProfile} from "../profile/profile.interface";
import {IBlogs} from "../blogs/blogs.interface";
import {blogReducer} from "./reducers/blogs.reducer";
import {storageMetaReducer} from "./reducers/storage.metareducer";

export interface State {
  profile: IProfile;
  blogs: {
    upcomingId: number,
    blogs: IBlogs[]
  };
}

export const reducers: ActionReducerMap<State> = {
  profile: profileReducer,
  blogs: blogReducer,
};

function logger(reducer: ActionReducer<State>):ActionReducer<State> {
  return function (state,action) {
    const res = reducer(state, action)
    console.log("latest state", res)
    console.log("state", state)
    console.log("action", action)
    return res;
  }
}

export const metaReducers: MetaReducer<any>[] = isDevMode() ? [storageMetaReducer] : [];
