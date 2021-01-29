import { TestBed } from '@angular/core/testing';

import { SpinnerService } from './spinner.service';

describe('SpinnerService', () => {
  let service: SpinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpinnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should isLoading true', () => {
    service.openLoading();

    expect(service.isLoading).toBeTrue();
  });

  it('should isLoading false', () => {
    service.closeLoading();

    expect(service.isLoading).toBeFalse();
  });
});
