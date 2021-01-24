import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';
import { AuthService } from '@services/auth/auth.service';
import { of } from 'rxjs';

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
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
