import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { RoleEnum } from '@models/role.enum';
import { SnackbarService } from '@modules/shared/services/snackbar/snackbar.service';

import { AuthService } from '@services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private snackbarService: SnackbarService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.authService.userLogged.role === RoleEnum.ADMIN) {
      return true;
    } else {
      this.snackbarService.openSnackBar('No tienes permisos de Administrador');
      this.router.navigate(['/starships']);
      return false;
    }
  }
}
