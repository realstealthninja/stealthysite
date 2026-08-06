export class BlogRequest {
  constructor (
    public title: string,
    public authorid: string,
    public content: string,
    public created_on: Date,
    public tags: string[]
  ) {}
}
