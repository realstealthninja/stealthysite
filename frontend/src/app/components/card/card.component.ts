import { Component, inject, input } from '@angular/core';
import { BlogDTO } from '../../interfaces/blog';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user/user.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card',
  imports: [RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  userService = inject(UserService);
  title = input.required<string>();
  blog = input<BlogDTO>();
  author = input<User | null>();
  description = input<string>();
  link = input<string[]>();
  link_text = input<string>();

  calculateReadTime(content: string): number {
    return Math.floor(content.split(' ').length / 230);
  }
}
