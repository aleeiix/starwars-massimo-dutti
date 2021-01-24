import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StarshipDetailComponent } from './views/starship-detail/starship-detail.component';

const routes: Routes = [{ path: '', component: StarshipDetailComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StarshipDetailRoutingModule {}
