import {
  ActivatedRouteSnapshot,
  RedirectCommand,
  ResolveFn,
  Router,
} from '@angular/router';

import { User } from '../interfaces/user';
import { UserauthService } from '../services/userauth/userauth.service';
import { inject } from '@angular/core';
import { of } from 'rxjs';
import { UserService } from '../services/user/user.service';

export const profileResolver: ResolveFn<User | RedirectCommand> = (
  route: ActivatedRouteSnapshot,
) => {
  const userauth = inject(UserauthService);
  const userService = inject(UserService);

  const router = inject(Router);
  const username = route.paramMap.get('username')!;

  if (username == 'me' && userauth.isLoggedIn) {
    // logged in user
    const user = userauth.loggedinUser();
    if (user.hasValue()) {
      return user.value();
    } else {
      return of(new RedirectCommand(router.parseUrl('login')));
    }
  } else {
    // random user
    const users = userService.getUserByUsername(username);
    if (users.hasValue()) {
      if (users.value().total === 1) {
        return users.value().users[0];
      } else {
        return of(new RedirectCommand(router.parseUrl('404')));
      }
    }
  }

  return of(new RedirectCommand(router.parseUrl('login')));
};
