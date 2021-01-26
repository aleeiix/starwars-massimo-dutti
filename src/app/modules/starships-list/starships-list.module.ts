import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { StarshipsListRoutingModule } from './starships-list-routing.module';
import { StarshipsListComponent } from './views/starships-list/starships-list.component';
import { StarshipCardComponent } from './components/starship-card/starship-card.component';

@NgModule({
  declarations: [StarshipsListComponent, StarshipCardComponent],
  imports: [CommonModule, StarshipsListRoutingModule, InfiniteScrollModule]
})
export class StarshipsListModule {}
