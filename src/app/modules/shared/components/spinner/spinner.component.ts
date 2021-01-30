import { Component } from '@angular/core';
import { SpinnerService } from './spinner.service';

@Component({
  selector: 'md-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {
  constructor(private spinnerService: SpinnerService) {}

  get isLoading(): boolean {
    return this.spinnerService.isLoading;
  }
}
