import { IndexedDBService } from './../indexed-db/indexed-db.service';
import { TestBed } from '@angular/core/testing';
import { RoleEnum } from '@models/role.enum';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should createUser return observable true', (done) => {
    const indexedDBService = TestBed.inject(IndexedDBService);

    const newUser = {
      role: RoleEnum.CLIENT,
      name: 'Test',
      lastname: 'Test',
      email: 'test@email.com',
      password: 'Test-1234'
    };

    const newUserDb = {
      role: RoleEnum.CLIENT,
      name: 'Test',
      lastname: 'Test',
      email: 'test@email.com',
      password: btoa('Test-1234')
    };

    spyOn(indexedDBService, 'addUser').and.returnValue(Promise.resolve(true));

    service.createUser(newUser).subscribe((res) => {
      expect(res).toEqual(true);
      expect(indexedDBService.addUser).toHaveBeenCalledWith(newUserDb);
      done();
    });
  });

  it('should createUser return observable false', (done) => {
    const indexedDBService = TestBed.inject(IndexedDBService);

    const newUser = {
      role: RoleEnum.CLIENT,
      name: 'Test',
      lastname: 'Test',
      email: 'test@email.com',
      password: 'Test-1234'
    };

    const newUserDb = {
      role: RoleEnum.CLIENT,
      name: 'Test',
      lastname: 'Test',
      email: 'test@email.com',
      password: btoa('Test-1234')
    };

    spyOn(indexedDBService, 'addUser').and.returnValue(Promise.resolve(false));

    service.createUser(newUser).subscribe((res) => {
      expect(res).toEqual(false);
      expect(indexedDBService.addUser).toHaveBeenCalledWith(newUserDb);
      done();
    });
  });

  it('should createUser return observable with error', (done) => {
    const errorTest = 'Error Test';
    const indexedDBService = TestBed.inject(IndexedDBService);

    const newUser = {
      role: RoleEnum.CLIENT,
      name: 'Test',
      lastname: 'Test',
      email: 'test@email.com',
      password: 'Test-1234'
    };

    const newUserDb = {
      role: RoleEnum.CLIENT,
      name: 'Test',
      lastname: 'Test',
      email: 'test@email.com',
      password: btoa('Test-1234')
    };

    spyOn(indexedDBService, 'addUser').and.returnValue(
      Promise.reject(errorTest)
    );

    service.createUser(newUser).subscribe(
      (res) => {},
      (err) => {
        expect(err).toEqual(errorTest);
        expect(indexedDBService.addUser).toHaveBeenCalledWith(newUserDb);
        done();
      }
    );
  });

  it('should login correct', (done) => {
    const indexedDBService = TestBed.inject(IndexedDBService);

    const userDb = {
      role: RoleEnum.CLIENT,
      name: 'Test',
      lastname: 'Test',
      email: 'test@email.com'
    };

    const userDbWithPassword = {
      ...userDb,
      password: btoa('Test-1234')
    };

    const login = {
      email: 'test@email.com',
      password: 'Test-1234'
    };

    spyOn(indexedDBService, 'getUserByEmail').and.returnValue(
      Promise.resolve(userDbWithPassword)
    );

    service.login(login).subscribe((res) => {
      expect(res).toEqual(true);
      expect(service.userLogged).toEqual(userDb);
      expect(JSON.parse(atob(localStorage.getItem('auth')))).toEqual(userDb);
      done();
    });
  });

  it('should login email not exist in database', (done) => {
    const indexedDBService = TestBed.inject(IndexedDBService);

    const login = {
      email: 'test@email.com',
      password: 'Test-1234'
    };

    spyOn(indexedDBService, 'getUserByEmail').and.returnValue(
      Promise.resolve(undefined)
    );

    service.login(login).subscribe((res) => {
      expect(res).toEqual(false);
      done();
    });
  });

  it('should login password not equal', (done) => {
    const indexedDBService = TestBed.inject(IndexedDBService);

    const userDb = {
      role: RoleEnum.CLIENT,
      name: 'Test',
      lastname: 'Test',
      email: 'test@email.com'
    };

    const userDbWithPassword = {
      ...userDb,
      password: btoa('Test-5678')
    };

    const login = {
      email: 'test@email.com',
      password: 'Test-1234'
    };

    spyOn(indexedDBService, 'getUserByEmail').and.returnValue(
      Promise.resolve(userDbWithPassword)
    );

    service.login(login).subscribe((res) => {
      expect(res).toEqual(false);
      done();
    });
  });

  it('should login return error', (done) => {
    const errorTest = 'Error Test';
    const indexedDBService = TestBed.inject(IndexedDBService);

    const login = {
      email: 'test@email.com',
      password: 'Test-1234'
    };

    spyOn(indexedDBService, 'getUserByEmail').and.returnValue(
      Promise.reject(errorTest)
    );

    service.login(login).subscribe(
      (res) => {},
      (err) => {
        expect(err).toEqual(errorTest);
        done();
      }
    );
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
});
