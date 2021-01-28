import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Register } from '@models/register.interface';
import { AuthService } from '@services/auth/auth.service';
import { SpinnerService } from '@modules/shared/components/spinner/spinner.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(
    private authService: AuthService,
    private spinnerService: SpinnerService
  ) {}

  createUser(register: Register): Observable<boolean> {
    this.spinnerService.openLoading();

    return this.authService.createUser(register).pipe(
      tap(() => {
        this.spinnerService.closeLoading();
      })
    );
  }
}
