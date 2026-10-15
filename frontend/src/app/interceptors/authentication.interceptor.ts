import { HttpInterceptorFn } from '@angular/common/http';
import { UserauthService } from '../services/userauth/userauth.service';
import { inject } from '@angular/core';

export const authenticationInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = inject(UserauthService).jwtToken;

  if (!authToken) {
    return next(req);
  } else {
    const newreq = req.clone({
      headers: req.headers.append('Authorization', 'Bearer ' + authToken),
    });
    return next(newreq);
  }
};
