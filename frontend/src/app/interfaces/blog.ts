import { User } from "./user";
import { Comment } from "./comment";

export interface Blog {
    id: number;
    title: string;
    tags: string[];
    content: string;
    comments: Comment[]
    author: User;
    created_on: Date;
    edited_on: Date;
}
