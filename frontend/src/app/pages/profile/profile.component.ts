import { Component, inject, input } from '@angular/core';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user/user.service';
import { MarkdownComponent } from 'ngx-markdown';
import { BloggingService } from '../../services/blogging/blogging.service';
import { BlogDTO } from '../../interfaces/blog';
import { CardComponent } from '../../components/card/card.component';

@Component({
  selector: 'app-profile',
  imports: [MarkdownComponent, CardComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  userService = inject(UserService);
  bloggingService = inject(BloggingService);

  user = input.required<User>();
  blogs = input.required<BlogDTO[]>();
  me = input.required<boolean>();
  edit_bio = false;

  async upload(event: Event) {
    const fileupload = event.target as HTMLInputElement;
    if (!fileupload.files || fileupload.files.length === 0) {
      return;
    }
    const file = fileupload.files[0];

    if (file.type !== 'image/png') {
      return alert('Only pngs allowed please.');
    }

    if (file.size > 5_000_000) {
      return alert('Avatars must be less than 5MB');
    }

    this.userService.uploadAvatar(file);
  }

  changeBio() {
    const textarea = document.getElementById(
      'bio-textarea',
    ) as HTMLTextAreaElement;

    this.userService.updateUser({ bio: textarea.value });
    this.edit_bio = !this.edit_bio;
  }
}
