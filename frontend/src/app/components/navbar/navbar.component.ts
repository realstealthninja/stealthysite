import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserauthService } from '../../services/userauth/userauth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  userAuth: UserauthService = inject(UserauthService);
  router: Router = inject(Router);
  changeDetector: ChangeDetectorRef = inject(ChangeDetectorRef);

  async logout() {
    this.userAuth.logoutUser();
    await this.router.navigate(['home']);
    this.changeDetector.markForCheck();
  }
}
