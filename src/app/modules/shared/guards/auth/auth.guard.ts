import { Injectable } from '@angular/core';
import { CanActivateChild, Router } from '@angular/router';

import { AuthService } from '@services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {}

  canActivateChild(): boolean {
    if (this.authService.userLogged) {
      return true;
    } else {
      // TODO: Mostrar snackbar de login
      this.router.navigate(['/login']);
      return false;
    }
  }
}
