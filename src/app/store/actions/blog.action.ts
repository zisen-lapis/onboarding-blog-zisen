import { createAction, props } from '@ngrx/store';
import { IBlogs } from '../../blogs/blogs.interface';

export const newBlog = createAction('[Blogs] New Blog', props<IBlogs>());
export const updateBlog = createAction('[Blogs] Update Blog', props<IBlogs>());
// export const deleteBlog = createAction('[Blogs] Delete Blog', props<{id: number}>());
export const getBlogs = createAction('[Blogs] Get Blogs');
export const returnError = createAction(
  '[Blogs] Return Error',
  props<{ error: string }>()
);
export const updateBlogs = createAction(
  '[Blogs] Update Blogs',
  props<{ blogs: IBlogs[] }>()
);
