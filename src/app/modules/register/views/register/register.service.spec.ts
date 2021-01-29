import { AuthService } from '@services/auth/auth.service';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSnackBarModule } from '@angular/material/snack-bar';

import { RoleEnum } from '@models/role.enum';
import { RegisterService } from './register.service';

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

    const newUser = {
      role: RoleEnum.CLIENT,
      name: 'Test',
      lastname: 'Test',
      email: 'test@email.com',
      password: 'Test-1234'
    };

    spyOn(authService, 'createUser').and.returnValue(of(true));

    service.createUser(newUser).subscribe((res) => {
      expect(res).toEqual(true);
      done();
    });
  });

  it('should createUser return Observable false', (done) => {
    const authService = TestBed.inject(AuthService);

    const newUser = {
      role: RoleEnum.CLIENT,
      name: 'Test',
      lastname: 'Test',
      email: 'test@email.com',
      password: 'Test-1234'
    };

    spyOn(authService, 'createUser').and.returnValue(of(false));

    service.createUser(newUser).subscribe((res) => {
      expect(res).toEqual(false);
      done();
    });
  });
});
