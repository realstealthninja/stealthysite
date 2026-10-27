import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { UserauthService } from '../../services/userauth/userauth.service';
import { inject } from '@angular/core';

export const bloggerGuard: CanActivateFn = async (_route, _state) => {
  const userAuthService = inject(UserauthService);
  const router = inject(Router);

  const user = await userAuthService.loggedinUser();

  if (!user) return false;
  if (
    userAuthService.isLoggedIn &&
    user.roles.some(
      (value) => value.name == 'ROLE_ADMIN' || value.name == 'ROLE_BLOGGER',
    )
  ) {
    return true;
  } else {
    return new RedirectCommand(router.parseUrl('home'));
  }
};
