import { Injectable } from '@angular/core';

import { AuthService } from './../../../../services/auth/auth.service';
import { Login } from './../../../../models/login.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private authService: AuthService) {}

  login(login: Login): Observable<any> {
    return this.authService.login(login);
  }
}
