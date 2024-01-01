import { createReducer, on } from '@ngrx/store';
import {
  newBlog,
  updateBlog,
  storeFetchedBlogs,
  fetchBlogs,
  returnError,
} from './blogs.action';
import { IBlogs, IBlogsState, ViewStatus } from './blogs';
import { createEntityAdapter } from '@ngrx/entity';
export const BLOGS_FEATURE_KEY = 'blogs';

export const adapter = createEntityAdapter<IBlogs>();

export const initialState: IBlogsState = adapter.getInitialState({
  viewStatus: ViewStatus.LOADING,
  fetchedBlogs: [],
});

export const blogReducer = createReducer(
  initialState,
  on(newBlog, (state, action) => adapter.addOne(action, state)),
  on(updateBlog, (state, action) => adapter.updateOne(action, state)),
  on(storeFetchedBlogs, (state, action) =>
    // fetch online blogs and replace the local ones
    ({
      ...state,
      fetchedBlogs: action.blogs,
      viewStatus: ViewStatus.LOADED,
    })
  ),
  on(fetchBlogs, state => ({ ...state, viewStatus: ViewStatus.LOADING })),
  on(returnError, state => ({ ...state, viewStatus: ViewStatus.ERROR }))
);
