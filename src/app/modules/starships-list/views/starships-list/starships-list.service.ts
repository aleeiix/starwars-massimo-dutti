import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { StarshipsDataService } from '@services/starships-data/starships-data.service';
import { Starship } from '@models/starship.interface';
import { createHeaders } from '@utils/utils';

@Injectable({
  providedIn: 'root'
})
export class StarshipsListService {
  private page = 1;
  private isfinish = false;

  private starshipsSubject: BehaviorSubject<Starship[]> = new BehaviorSubject(
    []
  );
  starships$ = this.starshipsSubject.asObservable();

  constructor(private starshipsDataService: StarshipsDataService) {}

  getStarships(): void {
    this.starshipsDataService
      .getStarshipsList(this.page, createHeaders(true))
      .subscribe((pagination) => {
        this.isfinish = pagination.next === null;
        this.starshipsSubject.next(pagination.results);
      });
  }

  getMoreStarships(): void {
    if (!this.isfinish) {
      ++this.page;

      this.starshipsDataService
        .getStarshipsList(this.page, createHeaders(true))
        .subscribe((pagination) => {
          this.isfinish = pagination.next === null;
          this.starshipsSubject.next([
            ...this.starshipsSubject.getValue(),
            ...pagination.results
          ]);
        });
    }
  }

  resetPages(): void {
    this.page = 1;
  }
}
