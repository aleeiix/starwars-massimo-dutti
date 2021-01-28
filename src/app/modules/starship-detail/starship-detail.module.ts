import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';

import { StarshipDetailRoutingModule } from './starship-detail-routing.module';
import { StarshipDetailComponent } from './views/starship-detail/starship-detail.component';

@NgModule({
  declarations: [StarshipDetailComponent],
  imports: [
    CommonModule,
    StarshipDetailRoutingModule,
    MatExpansionModule,
    MatIconModule
  ]
})
export class StarshipDetailModule {}
