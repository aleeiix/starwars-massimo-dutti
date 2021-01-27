import { map } from 'rxjs/operators';
import { Pagination } from './../../models/pagination.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Starship } from '@models/starship.interface';

@Injectable({
  providedIn: 'root'
})
export class StarshipsDataService {
  private readonly resourceUrlApi = '/starships';

  constructor(private httpClient: HttpClient) {}

  getStarshipsList(page: number = 1): Observable<Pagination<Starship>> {
    return this.httpClient
      .get<Pagination<Starship>>(
        `${environment.api_url}${this.resourceUrlApi}/?page=${page}`
      )
      .pipe(
        map((pagination) => {
          pagination.results = pagination.results.map((starship) => {
            starship.id = starship.url.split('/').slice(-2)[0];
            starship.image = `assets/images/starships/${starship.id}.jpg`;
            return starship;
          });

          return pagination;
        })
      );
  }
}
