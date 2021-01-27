import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { RoleEnum } from '@models/role.enum';

import { AuthService } from '@services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.userLogged.role === RoleEnum.ADMIN) {
      return true;
    } else {
      // TODO: Mostrar snackbar de permisos
      this.router.navigate(['/starships']);
      return false;
    }
  }
}
