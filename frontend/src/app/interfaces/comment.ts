import { User } from "./user";

export interface Comment {
    id: number;
    author: User;
    content: string;
    replies: Comment[];
}
