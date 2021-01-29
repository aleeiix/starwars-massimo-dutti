import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';

import { ErrorRoutingModule } from './error-routing.module';
import { ErrorComponent } from './views/error/error.component';

@NgModule({
  declarations: [ErrorComponent],
  imports: [CommonModule, ErrorRoutingModule, MatButtonModule]
})
export class ErrorModule {}
