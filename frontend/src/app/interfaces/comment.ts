import { User } from "./user";

export interface Comment {
    author: User;
    content: string;
    replies: Comment[];
}
