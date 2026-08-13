import { Blog } from './blog';

export interface User {
  id: string;
  username: string;
  blogs: Blog[] | number[];
}
