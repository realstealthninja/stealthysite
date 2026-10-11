import { Component, input } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-profile',
  imports: [CardComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  user = input.required<User>();
}
