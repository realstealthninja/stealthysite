import { inject, Pipe, PipeTransform } from '@angular/core';
import { BlogDTO } from '../interfaces/blog';
import { User } from '../interfaces/user';
import { UserService } from '../services/user/user.service';
import { Blog } from '../classes/blog/blog';

@Pipe({
  name: 'author',
})
export class AuthorPipe implements PipeTransform {
  userService = inject(UserService);

  async transform(value: BlogDTO | Blog): Promise<User> {
    return (await this.userService.getUser(value.author))!;
  }
}
