import { Blog } from "./blog";

export interface User {
    id: number;
    username: string;
    firstname: string;
    lastname: string;
    blogs: Blog[] | number[];
}
