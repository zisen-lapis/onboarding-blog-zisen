import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IBlogs, IBlogsState } from './blogs';
import { adapter, BLOGS_FEATURE_KEY } from './blogs.reducer';

export const selectFeature =
  createFeatureSelector<IBlogsState>(BLOGS_FEATURE_KEY);

export const selectFeatureBlogs = createSelector(
  selectFeature,
  adapter.getSelectors().selectAll
);

export const selectBlogById = (props: { id: string }) =>
  createSelector(
    selectFeatureBlogs,
    (blogs: IBlogs[]) => blogs.find(blog => blog.id === props.id)!
  );
export const selectFetched = createSelector(
  selectFeature,
  (state: IBlogsState) => state.fetchedBlogs
);
export const selectFetchedById = (props: { id: string }) =>
  createSelector(
    selectFetched,
    (fetched: IBlogs[]) => fetched.find(fetched => fetched.id === props.id)!
  );
export const selectViewStatus = createSelector(
  selectFeature,
  (state: IBlogsState) => state.viewStatus
);
