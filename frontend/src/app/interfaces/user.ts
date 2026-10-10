import { Blog } from './blog';
import { Comment } from './comment';

export interface User {
  id: string;
  username: string;
  avatar: string;
  bio: string;
  blogs: Blog[];
  comments: Comment[] | string[];
  roles: { name: string }[];
}
