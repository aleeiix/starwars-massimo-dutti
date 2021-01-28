import { finalize, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { SpinnerService } from '@modules/shared/components/spinner/spinner.service';
import { HeadersEnum } from '@models/headers.enum';

@Injectable({
  providedIn: 'root'
})
export class SpinnerInterceptorService implements HttpInterceptor {
  requestsInProgress = 0;

  constructor(private spinnerService: SpinnerService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.headers.has(HeadersEnum.NO_SPINNER)) {
      next.handle(req);
    } else {
      this.spinnerService.openLoading();
      this.requestsInProgress++;
    }

    return next.handle(req).pipe(
      finalize(() => {
        this.requestsInProgress--;
        if (this.requestsInProgress === 0) {
          this.spinnerService.closeLoading();
        }
      })
    );
  }
}
