import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
} from '@angular/router';
import { UserauthService } from '../../services/userauth/userauth.service';
import { inject } from '@angular/core';

export const userGuard: CanActivateFn = (
  _route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot,
) => {
  const userAuthService = inject(UserauthService);

  return userAuthService.isLoggedIn;
};
