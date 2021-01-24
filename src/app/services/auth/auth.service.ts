import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { IndexedDBService } from './../indexed-db/indexed-db.service';
import { Register } from '../../models/register.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private indexedDBService: IndexedDBService) {}

  createUser(newUser: Register): Observable<boolean> {
    return from(this.indexedDBService.addUser(newUser));
  }
}
