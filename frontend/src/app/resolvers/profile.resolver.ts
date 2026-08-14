import {
  ActivatedRouteSnapshot,
  RedirectCommand,
  ResolveFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { User } from '../interfaces/user';
import { UserauthService } from '../services/userauth/userauth.service';
import { inject } from '@angular/core';
import { of } from 'rxjs';

export const profileResolver: ResolveFn<User> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const userauth = inject(UserauthService);
  const router = inject(Router);
  const username = route.paramMap.get('username');

  if (username == 'me' && userauth.isLoggedIn) {
    if (userauth.loggedinUser().hasValue()) {
      return userauth.loggedinUser().value();
    }
  } else {
    return of(new RedirectCommand(router.parseUrl('/login')));
  }

  return of(new RedirectCommand(router.parseUrl('/login')));
};
