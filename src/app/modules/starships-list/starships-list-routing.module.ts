import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StarshipsListComponent } from './views/starships-list/starships-list.component';

const routes: Routes = [{ path: '', component: StarshipsListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StarshipsListRoutingModule {}
