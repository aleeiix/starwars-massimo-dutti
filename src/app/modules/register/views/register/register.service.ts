import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { Register } from '@models/register.interface';
import { AuthService } from '@services/auth/auth.service';
import { SpinnerService } from '@modules/shared/components/spinner/spinner.service';
import { SnackbarService } from '@modules/shared/services/snackbar/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(
    private authService: AuthService,
    private spinnerService: SpinnerService,
    private snackbarService: SnackbarService
  ) {}

  createUser(register: Register): Observable<boolean> {
    this.spinnerService.openLoading();

    return this.authService.createUser(register).pipe(
      tap((res) => {
        if (res) {
          this.snackbarService.openSnackBar('Gracias por registrarte');
        }
        this.spinnerService.closeLoading();
      }),
      catchError((err) => {
        this.spinnerService.closeLoading();
        return throwError(err);
      })
    );
  }
}
