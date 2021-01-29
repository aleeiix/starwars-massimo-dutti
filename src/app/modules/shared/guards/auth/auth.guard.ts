import { Injectable } from '@angular/core';
import { CanActivateChild, Router } from '@angular/router';
import { SnackbarService } from '@modules/shared/services/snackbar/snackbar.service';

import { AuthService } from '@services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateChild {
  constructor(
    private authService: AuthService,
    private snackbarService: SnackbarService,
    private router: Router
  ) {}

  canActivateChild(): boolean {
    if (this.authService.userLogged) {
      return true;
    } else {
      this.snackbarService.openSnackBar(
        'No puedes acceder, tienes que iniciar sesión'
      );
      this.router.navigate(['/login']);
      return false;
    }
  }
}
