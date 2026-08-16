import { Blog } from './blog';

export interface User {
  id: number;
  username: string;
  avatar: string;
  blogs: Blog[] | number[];
}
