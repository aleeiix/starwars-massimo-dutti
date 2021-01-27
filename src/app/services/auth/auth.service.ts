import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IndexedDBService } from './../indexed-db/indexed-db.service';
import { Register } from '@models/register.interface';
import { Login } from '@models/login.interface';
import { User } from '@models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly keyLocalStorage = 'auth';

  userLogged: User;

  constructor(private indexedDBService: IndexedDBService) {}

  createUser(register: Register): Observable<boolean> {
    const newUser = { ...register, password: this.encrypt(register.password) };

    return from(this.indexedDBService.addUser(newUser));
  }

  login(login: Login): Observable<boolean> {
    return from(this.indexedDBService.getUserByEmail(login.email)).pipe(
      map((user) => {
        if (user && user.password === this.encrypt(login.password)) {
          const { password, ...rest } = user;

          this.setUserLogged(rest);

          return true;
        }

        return false;
      })
    );
  }

  logout(): void {
    this.removeUserLogged();
  }

  private setUserLogged(user: User): void {
    this.userLogged = user;
    localStorage.setItem(
      this.keyLocalStorage,
      this.encrypt(JSON.stringify(user))
    );
  }

  private removeUserLogged(): void {
    this.userLogged = null;
    localStorage.removeItem(this.keyLocalStorage);
  }

  private encrypt(text: string): string {
    return btoa(text);
  }

  private decode(text: string): string {
    return atob(text);
  }
}
