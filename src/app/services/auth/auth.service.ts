import { IndexedDBService } from './../indexed-db/indexed-db.service';
import { Register } from '../../models/register.interface';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private IndexedDBService: IndexedDBService) {}

  createUser(newUser: Register): Observable<boolean> {
    return from(this.IndexedDBService.addUser(newUser));
  }
}
