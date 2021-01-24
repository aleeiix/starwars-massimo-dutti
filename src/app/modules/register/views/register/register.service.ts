import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Register } from './../../../../models/register.interface';
import { AuthService } from '../../../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(private authService: AuthService) {}

  createUser(register: Register): Observable<boolean> {
    return this.authService.createUser(register);
  }
}
