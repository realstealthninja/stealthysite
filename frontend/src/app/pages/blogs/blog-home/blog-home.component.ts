import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserauthService } from '../../../services/userauth/userauth.service';
import { BlogDTO } from '../../../interfaces/blog';
import { UserService } from '../../../services/user/user.service';
import { CardComponent } from '../../../components/card/card.component';
import { User } from '../../../interfaces/user';
import { AuthorPipe } from '../../../pipes/author.pipe';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-blog-home',
  imports: [RouterLink, CardComponent, AuthorPipe, AsyncPipe],
  templateUrl: './blog-home.component.html',
  styleUrl: './blog-home.component.css',
})
export class BlogHomeComponent {
  userAuth: UserauthService = inject(UserauthService);
  userService: UserService = inject(UserService);
  blogs = input.required<BlogDTO[]>();
  authors = input.required<User[]>();
}
