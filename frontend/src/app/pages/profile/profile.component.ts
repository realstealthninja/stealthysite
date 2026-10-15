import { Component, inject, input } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-profile',
  imports: [CardComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  user = input.required<User>();
  me = input.required<boolean>();

  userService = inject(UserService);

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
    location.reload();
  }
}
