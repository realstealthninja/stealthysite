import { Blog } from "./blog";

export interface User {
    id: number;
    username: string;
    blogs: Blog[] | number[];
}
