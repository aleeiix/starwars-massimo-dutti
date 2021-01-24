import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { LoggedLayoutComponent } from './layouts/logged-layout/logged-layout.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [LoggedLayoutComponent, HeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [LoggedLayoutComponent]
})
export class SharedModule {}
