import { createReducer, on } from '@ngrx/store';
import {IBlogs} from "../../blogs/blogs.interface";
import {newBlog, updateBlog} from "../actions/blog.action";


export const initialState: { upcomingId: number, blogs: IBlogs[] } = {
    upcomingId: 1,
    blogs: []
};

export const blogReducer = createReducer(
  initialState,
    on(newBlog, (state , action) => (
        {...state, upcomingId: state.upcomingId + 1, blogs: [...state.blogs, {...action, id: state.upcomingId}]}
    )),
    on(updateBlog, (state, action) => (
        {...state, blogs: state.blogs.map(blog => blog.id === action.id ? {...blog, ...action} : blog)}
    ))

);


