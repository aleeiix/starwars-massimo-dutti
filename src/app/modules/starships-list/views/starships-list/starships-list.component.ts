import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';
import { Observable } from 'rxjs';

import { StarshipsListService } from './starships-list.service';

import { Starship } from '@models/starship.interface';
import { TypeViewEnum } from '@models/type-view.enum';

@Component({
  selector: 'md-starships-list',
  templateUrl: './starships-list.component.html',
  styleUrls: ['./starships-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StarshipsListComponent implements OnInit, OnDestroy {
  TypeViewEnum = TypeViewEnum;

  starships$: Observable<Starship[]>;
  typeView: TypeViewEnum = TypeViewEnum.LARGE;

  constructor(
    private starshipsListService: StarshipsListService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.starships$ = this.starshipsListService.starships$;
    this.starshipsListService.getStarships();
  }

  onScroll(): void {
    this.starshipsListService.getMoreStarships();
  }

  changeTypeView(typeView: TypeViewEnum): void {
    this.typeView = typeView;
    this.changeDetectorRef.markForCheck();
  }

  ngOnDestroy(): void {
    this.starshipsListService.resetPages();
  }
}
