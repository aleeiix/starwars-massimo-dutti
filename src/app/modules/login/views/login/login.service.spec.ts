import { TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

import { MatSnackBarModule } from '@angular/material/snack-bar';

import { LoginService } from './login.service';
import { AuthService } from '@services/auth/auth.service';
import { SnackbarService } from '@modules/shared/services/snackbar/snackbar.service';
import { SpinnerService } from '@modules/shared/components/spinner/spinner.service';

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule, BrowserAnimationsModule]
    });
    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login return Observable true', (done) => {
    const authService = TestBed.inject(AuthService);
    const snackbarService = TestBed.inject(SnackbarService);
    const spinnerService = TestBed.inject(SpinnerService);

    const login = {
      email: 'test@email.com',
      password: 'Test-1234'
    };

    spyOn(authService, 'login').and.returnValue(of(true));
    spyOn(snackbarService, 'openSnackBar');
    spyOn(spinnerService, 'openLoading');
    spyOn(spinnerService, 'closeLoading');

    const loginResponse = service.login(login);

    expect(spinnerService.openLoading).toHaveBeenCalled();

    loginResponse.subscribe((res) => {
      expect(snackbarService.openSnackBar).toHaveBeenCalled();

      expect(spinnerService.closeLoading).toHaveBeenCalled();

      expect(res).toEqual(true);
      done();
    });
  });

  it('should login return Observable false', (done) => {
    const authService = TestBed.inject(AuthService);
    const snackbarService = TestBed.inject(SnackbarService);
    const spinnerService = TestBed.inject(SpinnerService);

    const login = {
      email: 'test@email.com',
      password: 'Test-1234'
    };

    spyOn(authService, 'login').and.returnValue(of(false));
    spyOn(snackbarService, 'openSnackBar');
    spyOn(spinnerService, 'openLoading');
    spyOn(spinnerService, 'closeLoading');

    const loginResponse = service.login(login);

    expect(snackbarService.openSnackBar).not.toHaveBeenCalled();
    expect(spinnerService.openLoading).toHaveBeenCalled();

    loginResponse.subscribe((res) => {
      expect(spinnerService.closeLoading).toHaveBeenCalled();

      expect(res).toEqual(false);
      done();
    });
  });
});
