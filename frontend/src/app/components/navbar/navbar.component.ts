import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink} from '@angular/router';
import { UserauthService } from '../../services/userauth/userauth.service';

@Component({
    selector: 'app-navbar',
    imports: [RouterLink],
    templateUrl: './navbar.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  userAuth: UserauthService = inject(UserauthService);

}
