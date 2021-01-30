import { Injectable } from '@angular/core';
import { from, Observable, throwError } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { IndexedDBService } from './../indexed-db/indexed-db.service';
import { Register } from '@models/register.interface';
import { Login } from '@models/login.interface';
import { User } from '@models/user.interface';

import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly keyLocalStorage = 'auth';

  userLogged: User;
  table: Dexie.Table<Register, string>;

  constructor(private indexedDBService: IndexedDBService) {
    this.table = this.indexedDBService.table(environment.local_db_tale_users);
  }

  createUser(register: Register): Observable<boolean> {
    const newUser = { ...register, password: this.encrypt(register.password) };

    return from(this.table.get(newUser.email)).pipe(
      switchMap((user) => {
        if (user) {
          return throwError('El email insertado ya existe.');
        }

        return from(this.table.add(newUser, newUser.email)).pipe(
          map(() => true)
        );
      })
    );
  }

  login(login: Login): Observable<boolean> {
    return from(this.table.get(login.email)).pipe(
      map((user) => {
        if (user && user.password === this.encrypt(login.password)) {
          delete user.password;
          this.setUserLogged(user);
          return true;
        }
        return false;
      })
    );
  }

  logout(): void {
    this.removeUserLogged();
  }

  checkUserLogged(): void {
    const localstorageData = localStorage.getItem(this.keyLocalStorage);
    if (localstorageData) {
      const userLocalStorage = JSON.parse(this.decode(localstorageData));
      this.userLogged = userLocalStorage;
    }
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
