import { Blog } from './blog';

describe('Blog', () => {
  it('should create an instance', () => {
    expect(
      new Blog(
        '123e-232-3333',
        'Hello blog',
        [''],
        '',
        [],
        '333-333-333',
        new Date(),
        new Date(),
      ),
    ).toBeTruthy();

    expect(
      Blog.fromJson({
        id: '',
        title: '',
        tags: [],
        content: '',
        comments: [],
        author: '',
        createdOn: '',
        editedOn: '',
      }),
    ).toBeTruthy();
  });
});
