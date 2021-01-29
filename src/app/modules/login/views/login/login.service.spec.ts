import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSnackBarModule } from '@angular/material/snack-bar';

import { LoginService } from './login.service';
import { AuthService } from '@services/auth/auth.service';

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

    const login = {
      email: 'test@email.com',
      password: 'Test-1234'
    };

    spyOn(authService, 'login').and.returnValue(of(true));

    service.login(login).subscribe((res) => {
      expect(res).toEqual(true);
      done();
    });
  });

  it('should login return Observable false', (done) => {
    const authService = TestBed.inject(AuthService);

    const login = {
      email: 'test@email.com',
      password: 'Test-1234'
    };

    spyOn(authService, 'login').and.returnValue(of(false));

    service.login(login).subscribe((res) => {
      expect(res).toEqual(false);
      done();
    });
  });
});
