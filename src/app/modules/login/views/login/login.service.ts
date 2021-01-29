import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { AuthService } from '@services/auth/auth.service';
import { Login } from '@models/login.interface';
import { Observable } from 'rxjs';
import { SpinnerService } from '@modules/shared/components/spinner/spinner.service';
import { SnackbarService } from '@modules/shared/services/snackbar/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(
    private authService: AuthService,
    private spinnerService: SpinnerService,
    private snackbarService: SnackbarService
  ) {}

  login(login: Login): Observable<boolean> {
    this.spinnerService.openLoading();

    return this.authService.login(login).pipe(
      tap((res) => {
        if (res) {
          this.snackbarService.openSnackBar('Sesión iniciada');
        }
        this.spinnerService.closeLoading();
      })
    );
  }
}
