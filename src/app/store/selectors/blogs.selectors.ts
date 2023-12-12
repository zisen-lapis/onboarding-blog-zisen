import { createFeatureSelector, createSelector } from '@ngrx/store';
import {IBlogs} from "../../blogs/blogs.interface";

export const featureKey = 'blogs';

export interface FeatureState {
    upcomingId: number;
    blogs: IBlogs[];
}

export const selectFeature = createFeatureSelector<FeatureState>(featureKey);

export const selectFeatureBlogs = createSelector(
    selectFeature,
    (state: FeatureState) => state.blogs
);

export const selectBlogWithID = (props: {id: number}) => createSelector(
    selectFeatureBlogs,
    (blogs: IBlogs[]) => blogs.find(blog => blog.id === props.id)
);
