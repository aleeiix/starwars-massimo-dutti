import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LoggedLayoutComponent } from './layouts/logged-layout/logged-layout.component';

@NgModule({
  declarations: [LoggedLayoutComponent],
  imports: [CommonModule, RouterModule],
  exports: [LoggedLayoutComponent]
})
export class SharedModule {}
