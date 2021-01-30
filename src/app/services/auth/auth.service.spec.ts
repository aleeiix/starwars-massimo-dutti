import { environment } from 'src/environments/environment';
import { TestBed } from '@angular/core/testing';

import { IndexedDBService } from './../indexed-db/indexed-db.service';
import { AuthService } from './auth.service';
import { RoleEnum } from '@models/role.enum';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);

    service.table.clear();

    service.userLogged = null;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should createUser success', (done) => {
    const newUser = {
      role: RoleEnum.CLIENT,
      name: 'Test',
      lastname: 'Test',
      email: 'test@email.com',
      password: 'Test-1234'
    };
    service.createUser(newUser).subscribe((res) => {
      expect(res).toEqual(true);
      done();
    });
  });

  it('should createUser error  email already exist', (done) => {
    const newUser = {
      role: RoleEnum.CLIENT,
      name: 'Test',
      lastname: 'Test',
      email: 'test@email.com',
      password: 'Test-1234'
    };

    service.createUser(newUser).subscribe(() => {
      service.createUser(newUser).subscribe(
        () => {},
        (err) => {
          expect(err).toEqual('El email insertado ya existe.');
          done();
        }
      );
    });
  });

  it('should login correct', (done) => {
    const newUser = {
      role: RoleEnum.CLIENT,
      name: 'Test',
      lastname: 'Test',
      email: 'test@email.com',
      password: 'Test-1234'
    };

    const login = {
      email: 'test@email.com',
      password: 'Test-1234'
    };

    service.createUser(newUser).subscribe(() => {
      delete newUser.password;
      service.login(login).subscribe((res) => {
        expect(res).toEqual(true);
        expect(service.userLogged).toEqual(newUser);
        expect(JSON.parse(atob(localStorage.getItem('auth')))).toEqual(newUser);
        done();
      });
    });
  });

  it('should login email not exist in database', (done) => {
    const login = {
      email: 'test@email.com',
      password: 'Test-1234'
    };

    service.login(login).subscribe((res) => {
      expect(res).toEqual(false);
      done();
    });
  });

  it('should login password not equal', (done) => {
    const newUser = {
      role: RoleEnum.CLIENT,
      name: 'Test',
      lastname: 'Test',
      email: 'test@email.com',
      password: 'Test-1234'
    };

    const login = {
      email: 'test@email.com',
      password: 'Test-5678'
    };

    service.createUser(newUser).subscribe(() => {
      service.login(login).subscribe((res) => {
        expect(res).toEqual(false);
        done();
      });
    });
  });

  it('should logout', () => {
    service.userLogged = {
      email: 'test@email.com',
      name: 'Test',
      lastname: 'Test',
      role: RoleEnum.CLIENT
    };

    localStorage.setItem('auth', btoa(JSON.stringify(service.userLogged)));

    service.logout();

    expect(service.userLogged).toBeNull();
    expect(localStorage.getItem('auth')).toBeNull();
  });

  it('should checkUserLogged set userLogged', () => {
    const user = {
      email: 'test@email.com',
      name: 'Test',
      lastname: 'Test',
      role: RoleEnum.CLIENT
    };

    localStorage.setItem('auth', btoa(JSON.stringify(user)));

    service.checkUserLogged();

    expect(service.userLogged).toEqual(user);
  });

  it('should checkUserLogged not set userLogged', () => {
    localStorage.removeItem('auth');

    service.checkUserLogged();

    expect(service.userLogged).toBeNull();
  });
});
