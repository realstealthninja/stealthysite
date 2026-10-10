import { User } from './user';
import { Comment } from './comment';

export interface Blog {
  id: string;
  title: string;
  tags: string[];
  content: string;
  comments: Comment[];
  author: User | string;
  created_on: Date;
  edited_on: Date;
}
