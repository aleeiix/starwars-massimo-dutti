import { of } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MatSnackBarModule } from '@angular/material/snack-bar';

import { ErrorInterceptorService } from './error-interceptor.service';
import { SnackbarService } from '@modules/shared/services/snackbar/snackbar.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

describe('ErrorInterceptorService', () => {
  let service: ErrorInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, MatSnackBarModule]
    });
    service = TestBed.inject(ErrorInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should intercept error', () => {
    const snackbarService = TestBed.inject(SnackbarService);
    spyOn(snackbarService, 'openSnackBar');

    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    const error = new HttpErrorResponse({
      status: 404
    });

    service
      .intercept(
        {
          clone: () => true,
          url: 'test',
          headers: {
            keys: () => [],
            has: () => false,
            append: () => 'test'
          }
        } as any,
        { handle: () => of(error) } as any
      )
      .subscribe();

    expect(snackbarService.openSnackBar).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalled();
  });

  it('should intercept not error', () => {
    const snackbarService = TestBed.inject(SnackbarService);
    spyOn(snackbarService, 'openSnackBar');

    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    service
      .intercept(
        {
          clone: () => true,
          url: 'test',
          headers: {
            keys: () => [],
            has: () => false,
            append: () => 'test'
          }
        } as any,
        { handle: () => of(true) } as any
      )
      .subscribe();

    expect(snackbarService.openSnackBar).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });
});
