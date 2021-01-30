import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AdminGuard } from './admin.guard';
import { AuthService } from '@services/auth/auth.service';
import { RoleEnum } from '@models/role.enum';
import { SnackbarService } from '@modules/shared/services/snackbar/snackbar.service';
import { Router } from '@angular/router';

describe('AdminGuard', () => {
  let guard: AdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, MatSnackBarModule, BrowserAnimationsModule]
    });
    guard = TestBed.inject(AdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should canActivate return true', () => {
    const authService = TestBed.inject(AuthService);

    authService.userLogged = {
      name: 'Test',
      lastname: 'Test',
      email: 'test@email.com',
      role: RoleEnum.ADMIN
    };

    expect(guard.canActivate()).toEqual(true);
  });

  it('should canActivate return false', () => {
    const authService = TestBed.inject(AuthService);
    const snackbarService = TestBed.inject(SnackbarService);
    const router = TestBed.inject(Router);

    authService.userLogged = {
      name: 'Test',
      lastname: 'Test',
      email: 'test@email.com',
      role: RoleEnum.CLIENT
    };

    spyOn(snackbarService, 'openSnackBar');
    spyOn(router, 'navigate');

    expect(guard.canActivate()).toEqual(false);
    expect(snackbarService.openSnackBar).toHaveBeenCalledWith(
      'No tienes permisos de Administrador'
    );
    expect(router.navigate).toHaveBeenCalledWith(['/starships']);
  });
});
