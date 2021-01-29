import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SnackbarService } from '@modules/shared/services/snackbar/snackbar.service';

import { AuthService } from '@services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private snackbarService: SnackbarService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (!this.authService.userLogged) {
      return true;
    } else {
      this.snackbarService.openSnackBar('Ya tienes una sesión abierta');
      this.router.navigate(['/starships']);
      return false;
    }
  }
}
