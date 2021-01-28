import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  isLoading = false;

  constructor() {}

  openLoading(): void {
    this.isLoading = true;
  }

  closeLoading(): void {
    this.isLoading = false;
  }
}
