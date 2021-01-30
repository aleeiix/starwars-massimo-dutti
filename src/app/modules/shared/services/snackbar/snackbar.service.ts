import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  constructor(private matSnackBar: MatSnackBar) {}

  openSnackBar(message: string, action?: string): void {
    this.matSnackBar.open(message, action, {
      duration: environment.snackbar_time,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  }
}
