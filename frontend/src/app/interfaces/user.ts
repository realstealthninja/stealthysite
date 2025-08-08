import { Blog } from "./blog";

export interface User {
    username: string;
    firstname: string;
    lastname: string;
    blogs: Blog[];
}
