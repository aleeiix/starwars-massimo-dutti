import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { StarshipDetailService } from './starship-detail.service';

import { Starship } from '@models/starship.interface';

import { environment } from '@environments/environment';

@Component({
  selector: 'md-starship-detail',
  templateUrl: './starship-detail.component.html',
  styleUrls: ['./starship-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StarshipDetailComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  starship: Starship;

  error = false;

  get imageStyle(): { 'background-image': string } {
    if (this.error) {
      return { 'background-image': `url(${environment.image_not_found})` };
    } else {
      return { 'background-image': `url(${this.starship.image})` };
    }
  }

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
        this.starship = starship;
        this.changeDetectorRef.markForCheck();
      });
  }

  showImageNotFound(): void {
    this.error = true;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
