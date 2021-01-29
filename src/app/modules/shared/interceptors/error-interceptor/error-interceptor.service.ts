import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { retry, tap } from 'rxjs/operators';
import { SnackbarService } from '@modules/shared/services/snackbar/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {
  constructor(
    private router: Router,
    private snackbarService: SnackbarService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      retry(1),
      tap((error: any) => {
        if (error instanceof HttpErrorResponse) {
          this.snackbarService.openSnackBar(
            error.message,
            String(error.status)
          );

          this.router.navigate(['error']);
        }
      })
    );
  }
}
