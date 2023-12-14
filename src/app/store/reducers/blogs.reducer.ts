import { createReducer, on } from '@ngrx/store';
import { IBlogs } from '../../blogs/blogs.interface';
import { newBlog, updateBlog, updateBlogs } from '../actions/blog.action';

export const initialState: { upcomingId: number; blogs: IBlogs[] } = {
  upcomingId: 1,
  blogs: [],
};

export const blogReducer = createReducer(
  initialState,
  on(newBlog, (state, action) => ({
    ...state,
    upcomingId: state.upcomingId + 1,
    blogs: [...state.blogs, { ...action, id: state.upcomingId }],
  })),
  on(updateBlog, (state, action) => ({
    ...state,
    blogs: state.blogs.map(blog =>
      blog.id === action.id ? { ...blog, ...action } : blog
    ),
  })),
  on(updateBlogs, (state, action) =>
    // append new blogs to the existing blogs
    ({ ...state, blogs: [...state.blogs, ...action.blogs] })
  )
);
