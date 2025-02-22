import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  console.log('[authGuard] se disparo authGuard')

  const router = inject(Router);
  return router.createUrlTree(['auth']);
};
