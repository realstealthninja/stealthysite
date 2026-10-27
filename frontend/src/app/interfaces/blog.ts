import { Comment } from './comment';

export interface BlogDTO {
  id: string;
  title: string;
  tags: string[];
  content: string;
  comments: Comment[];
  author: string;
  createdOn: string;
  editedOn: string;
}

export interface BlogModel {
  title: string;
  tags: string[];
  content: File;
}
