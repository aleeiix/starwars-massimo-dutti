import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { StarshipsListService } from './starships-list.service';

import { Starship } from '@models/starship.interface';

@Component({
  selector: 'md-starships-list',
  templateUrl: './starships-list.component.html',
  styleUrls: ['./starships-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StarshipsListComponent implements OnInit {
  starships$: Observable<Starship[]>;

  constructor(private starshipsListService: StarshipsListService) {}

  ngOnInit(): void {
    this.starships$ = this.starshipsListService.starships$;
    this.starshipsListService.getStarships();
  }

  onScroll(): void {
    this.starshipsListService.getMoreStarships();
  }
}
