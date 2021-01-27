import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from '@services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (!this.authService.userLogged) {
      return true;
    } else {
      // TODO: Mostrar snackbar de login
      this.router.navigate(['/starships']);
      return false;
    }
  }
}
