import { createAction, props } from '@ngrx/store';
import { IBlogs } from './blogs';
import { Update } from '@ngrx/entity';

export const newBlog = createAction('[Blogs] New Blog', props<IBlogs>());
export const updateBlog = createAction(
  '[Blogs] Update Blog',
  props<Update<IBlogs>>()
);
// export const deleteBlog = createAction('[Blogs] Delete Blog', props<{id: number}>());
export const fetchBlogs = createAction('[Blogs] Fetch Blogs');
export const returnError = createAction(
  '[Blogs] Return Error',
  props<{ error: string }>()
);
export const storeFetchedBlogs = createAction(
  '[Blogs] Store Fetched Blogs',
  props<{ blogs: IBlogs[] }>()
);
