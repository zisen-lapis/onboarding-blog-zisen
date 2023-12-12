import {createAction, props} from "@ngrx/store";
import {IProfile} from "../../profile/profile.interface";
import {IBlogs} from "../../blogs/blogs.interface";

export const newBlog = createAction('[Blogs] New Blog', props<IBlogs>());
export const updateBlog = createAction('[Blogs] Update Blog', props<IBlogs>());
export const deleteBlog = createAction('[Blogs] Delete Blog', props<{id: number}>());