import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { SpinnerService } from '@modules/shared/components/spinner/spinner.service';
import { HttpHeadersEnum } from '@models/http-headers.enum';

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
    if (req.headers.has(HttpHeadersEnum.NO_SPINNER)) {
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
