import { TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { SnackbarService } from './snackbar.service';

import { environment } from '@environments/environment';

describe('SnackbarService', () => {
  let service: SnackbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule]
    });
    service = TestBed.inject(SnackbarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should run matSnackBar.open', () => {
    const matSnackBar = TestBed.inject(MatSnackBar);

    spyOn(matSnackBar, 'open');

    service.openSnackBar('Test1', 'Test2');

    expect(matSnackBar.open).toHaveBeenCalledWith('Test1', 'Test2', {
      duration: environment.snackbar_time,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  });
});
