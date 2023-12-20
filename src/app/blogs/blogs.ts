import { EntityState } from '@ngrx/entity';

export interface IBlogs {
  id?: string;
  title: string;
  content: string;
  editedTime: Date;
  author: string;
  location?: {
    lat?: number;
    lng?: number;
  };
}

export enum ViewStatus {
  LOADING = 'LOADING',
  LOADED = 'LOADED',
  ERROR = 'ERROR',
}

export interface IBlogsState extends EntityState<IBlogs> {
  viewStatus: ViewStatus;
  fetchedBlogs: IBlogs[];
}
