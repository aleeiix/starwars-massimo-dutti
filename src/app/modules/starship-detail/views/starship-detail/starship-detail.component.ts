import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { Starship } from '@models/starship.interface';

import { StarshipDetailService } from './starship-detail.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'md-starship-detail',
  templateUrl: './starship-detail.component.html',
  styleUrls: ['./starship-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StarshipDetailComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  starship: Starship;

  constructor(
    private activatedRoute: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef,
    private starshipDetailService: StarshipDetailService
  ) {}

  ngOnInit(): void {
    this.subscription = this.activatedRoute.params
      .pipe(
        switchMap((params: any) =>
          this.starshipDetailService.getStarshipById(params.id)
        )
      )
      .subscribe((starship) => {
        console.log(starship);

        this.starship = starship;
        this.changeDetectorRef.markForCheck();
      });
  }

  showImageNotFound(event: { target: { src: string } }): void {
    event.target.src = environment.image_not_found;
  }

  ngOnDestroy(): void {
    // if (this.subscription) {
    //   this.subscription.unsubscribe();
    // }
  }
}
