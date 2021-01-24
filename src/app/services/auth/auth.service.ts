import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IndexedDBService } from './../indexed-db/indexed-db.service';
import { Register } from '../../models/register.interface';
import { Login } from './../../models/login.interface';
import { User } from './../../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userLogged: User;

  constructor(private indexedDBService: IndexedDBService) {}

  createUser(newUser: Register): Observable<boolean> {
    // TODO: Encriptar password
    return from(this.indexedDBService.addUser(newUser));
  }

  login(login: Login): Observable<boolean> {
    return from(this.indexedDBService.getUserByEmail(login.email)).pipe(
      map((user) => {
        if (user && user.password === login.password) {
          const { password, ...rest } = user;

          this.setUserLogged(rest);

          return true;
        }

        return false;
      })
    );
  }

  private setUserLogged(user: User): void {
    this.userLogged = user;
    localStorage.setItem('auth', btoa(JSON.stringify(user)));
  }
}
