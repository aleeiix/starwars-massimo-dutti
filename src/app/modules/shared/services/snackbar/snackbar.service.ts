import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

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
