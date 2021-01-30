import { TestBed } from '@angular/core/testing';
import { of, Subject, Observable } from 'rxjs';

import { SpinnerInterceptorService } from './spinner-interceptor.service';
import { SpinnerService } from '@modules/shared/components/spinner/spinner.service';
import { HttpHeadersEnum } from '@models/http-headers.enum';

describe('SpinnerInterceptorService', () => {
  let service: SpinnerInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpinnerInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should intercept show spinner', () => {
    const spinnerService = TestBed.inject(SpinnerService);
    spyOn(spinnerService, 'openLoading');
    spyOn(spinnerService, 'closeLoading');

    const result = service.intercept(
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
    );

    expect(service.requestsInProgress).toEqual(1);
    expect(spinnerService.openLoading).toHaveBeenCalled();
  });

  it('should intercept show spinner and close', () => {
    const spinnerService = TestBed.inject(SpinnerService);
    spyOn(spinnerService, 'closeLoading');

    const fakeResult = new Subject<boolean>();

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
        {
          handle: () =>
            new Observable((subscriber) => {
              subscriber.complete();
            })
        } as any
      )
      .subscribe(() => {
        expect(service.requestsInProgress).toEqual(0);
        expect(spinnerService.closeLoading).toHaveBeenCalled();
      });
  });

  it('should intercept show spinner but not close', () => {
    const spinnerService = TestBed.inject(SpinnerService);
    spyOn(spinnerService, 'closeLoading');

    const fakeResult = new Subject<boolean>();
    service.intercept(
      {
        clone: () => true,
        url: 'test',
        headers: {
          keys: () => [],
          has: () => false,
          append: () => 'test'
        }
      } as any,
      {
        handle: () =>
          new Observable((subscriber) => {
            subscriber.complete();
          })
      } as any
    );

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
        {
          handle: () =>
            new Observable((subscriber) => {
              subscriber.complete();
            })
        } as any
      )
      .subscribe(() => {
        expect(service.requestsInProgress).toEqual(1);
        expect(spinnerService.closeLoading).not.toHaveBeenCalled();
      });
  });

  it('should intercept NO_SPINNER', () => {
    service.intercept(
      {
        clone: () => true,
        url: 'test',
        headers: {
          keys: () => [HttpHeadersEnum.NO_SPINNER],
          has: () => true,
          append: () => 'test'
        }
      } as any,
      { handle: () => of(true) } as any
    );

    expect(service.requestsInProgress).toEqual(0);
  });
});
