import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuthGuard } from './auth.guard';
import { AuthService } from '@services/auth/auth.service';
import { RoleEnum } from '@models/role.enum';
import { SnackbarService } from '@modules/shared/services/snackbar/snackbar.service';
import { Router } from '@angular/router';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, MatSnackBarModule, BrowserAnimationsModule]
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should canActivateChild return true', () => {
    const authService = TestBed.inject(AuthService);

    authService.userLogged = {
      name: 'Test',
      lastname: 'Test',
      email: 'test@email.com',
      role: RoleEnum.CLIENT
    };

    expect(guard.canActivateChild()).toEqual(true);
  });

  it('should canActivateChild return false', () => {
    const authService = TestBed.inject(AuthService);
    const snackbarService = TestBed.inject(SnackbarService);
    const router = TestBed.inject(Router);

    authService.userLogged = null;

    spyOn(snackbarService, 'openSnackBar');
    spyOn(router, 'navigate');

    expect(guard.canActivateChild()).toEqual(false);
    expect(snackbarService.openSnackBar).toHaveBeenCalledWith(
      'No puedes acceder, tienes que iniciar sesión'
    );
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
