import { AuthService } from '@services/auth/auth.service';
import { TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

import { MatSnackBarModule } from '@angular/material/snack-bar';

import { RoleEnum } from '@models/role.enum';
import { RegisterService } from './register.service';
import { SnackbarService } from '@modules/shared/services/snackbar/snackbar.service';
import { SpinnerService } from '@modules/shared/components/spinner/spinner.service';

describe('RegisterService', () => {
  let service: RegisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule, BrowserAnimationsModule]
    });
    service = TestBed.inject(RegisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should createUser return Observable true', (done) => {
    const authService = TestBed.inject(AuthService);
    const snackbarService = TestBed.inject(SnackbarService);
    const spinnerService = TestBed.inject(SpinnerService);

    const newUser = {
      role: RoleEnum.CLIENT,
      name: 'Test',
      lastname: 'Test',
      email: 'test@email.com',
      password: 'Test-1234'
    };

    spyOn(authService, 'createUser').and.returnValue(of(true));
    spyOn(snackbarService, 'openSnackBar');
    spyOn(spinnerService, 'openLoading');
    spyOn(spinnerService, 'closeLoading');

    const createUserResponse = service.createUser(newUser);

    expect(spinnerService.openLoading).toHaveBeenCalled();

    createUserResponse.subscribe((res) => {
      expect(snackbarService.openSnackBar).toHaveBeenCalled();

      expect(spinnerService.closeLoading).toHaveBeenCalled();

      expect(res).toEqual(true);
      done();
    });
  });

  it('should createUser return Observable false', (done) => {
    const authService = TestBed.inject(AuthService);
    const snackbarService = TestBed.inject(SnackbarService);
    const spinnerService = TestBed.inject(SpinnerService);

    const newUser = {
      role: RoleEnum.CLIENT,
      name: 'Test',
      lastname: 'Test',
      email: 'test@email.com',
      password: 'Test-1234'
    };

    spyOn(authService, 'createUser').and.returnValue(of(false));
    spyOn(snackbarService, 'openSnackBar');
    spyOn(spinnerService, 'openLoading');
    spyOn(spinnerService, 'closeLoading');

    const createUserResponse = service.createUser(newUser);

    expect(spinnerService.openLoading).toHaveBeenCalled();

    createUserResponse.subscribe((res) => {
      expect(spinnerService.closeLoading).toHaveBeenCalled();

      expect(res).toEqual(false);
      done();
    });
  });
});
