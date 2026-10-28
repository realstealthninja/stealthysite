import { BlogDTO } from '../../interfaces/blog';
import { Comment } from '../../interfaces/comment';

export class Blog {
  constructor(
    public id: string,
    public title: string,
    public tags: string[],
    public content: string,
    public comments: Comment[],
    public author: string,
    public createdOn: Date,
    public editedOn: Date,
  ) {}

  static fromJson(dto: BlogDTO): Blog {
    return new Blog(
      dto.id,
      dto.title,
      dto.tags,
      dto.content,
      dto.comments,
      dto.author,
      new Date(dto.createdOn),
      new Date(dto.editedOn),
    );
  }
}
