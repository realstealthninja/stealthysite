import { Component, computed, inject } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-profile',
  imports: [CardComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  private route = inject(ActivatedRoute);
  private data = toSignal(this.route.data);

  user = computed(() => this.data()! as User);
}
