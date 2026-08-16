import { Blog } from './blog';

export interface User {
  id: string;
  username: string;
  avatar: string;
  blogs: Blog[] | number[];
}
