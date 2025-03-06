import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  console.log('[authGuard] se disparo authGuard')

  const router = inject(Router);
  const authService = inject(AuthService);
  // return  authService. router.createUrlTree(['auth', 'login']);
  return authService.isAuthenticated().pipe(
    map((isAuthenticated) => {
      if (!isAuthenticated) {
        return router.createUrlTree(['auth', 'login']);
      }
      return isAuthenticated;
    })
  );
};