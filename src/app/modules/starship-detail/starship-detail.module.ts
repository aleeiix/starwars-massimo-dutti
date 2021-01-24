import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StarshipDetailRoutingModule } from './starship-detail-routing.module';
import { StarshipDetailComponent } from './views/starship-detail/starship-detail.component';

@NgModule({
  declarations: [StarshipDetailComponent],
  imports: [CommonModule, StarshipDetailRoutingModule]
})
export class StarshipDetailModule {}
