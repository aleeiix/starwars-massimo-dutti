import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { StarshipsDataService } from '@services/starships-data/starships-data.service';
import { Pagination } from '@models/pagination.interface';
import { Starship } from '@models/starship.interface';

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
      .getStarshipsList(this.page)
      .subscribe((pagination) => {
        this.isfinish = pagination.next === null;
        this.starshipsSubject.next(pagination.results);
      });
  }

  getMoreStarships(): void {
    if (!this.isfinish) {
      ++this.page;

      this.starshipsDataService
        .getStarshipsList(this.page)
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
