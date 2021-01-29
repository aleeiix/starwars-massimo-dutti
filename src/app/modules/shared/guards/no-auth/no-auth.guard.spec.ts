import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NoAuthGuard } from './no-auth.guard';

describe('NoAuthGuard', () => {
  let guard: NoAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, MatSnackBarModule, BrowserAnimationsModule]
    });
    guard = TestBed.inject(NoAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
