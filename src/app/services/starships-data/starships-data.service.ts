import { map, tap } from 'rxjs/operators';
import { Pagination } from '@models/pagination.interface';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Starship } from '@models/starship.interface';
import { getIdByUrl } from '@utils/utils';
import { CacheService } from '@services/cache/cache.service';

@Injectable({
  providedIn: 'root'
})
export class StarshipsDataService {
  private readonly resourceUrlApi = '/starships';
  private readonly cacheKey = 'starships';

  constructor(
    private httpClient: HttpClient,
    private cacheService: CacheService
  ) {}

  getStarshipsList(
    page: number = 1,
    headers: HttpHeaders
  ): Observable<Pagination<Starship>> {
    const starshipCache = this.cacheService.getData<Pagination<Starship>>(
      this.cacheKey,
      `page=${page}`
    );
    if (starshipCache) {
      return of(starshipCache);
    }

    return this.httpClient
      .get<Pagination<Starship>>(
        `${environment.api_url}${this.resourceUrlApi}/?page=${page}`,
        { headers }
      )
      .pipe(
        map((pagination) => {
          pagination.results = pagination.results.map((starship) => {
            starship.id = getIdByUrl(starship.url);
            starship.image = `assets/images/starships/${starship.id}.jpg`;
            return starship;
          });

          return pagination;
        }),
        tap((pagination) => {
          this.cacheService.saveData<Pagination<Starship>>(
            this.cacheKey,
            `page=${page}`,
            pagination
          );
        })
      );
  }

  getStarshipById(id: string, headers: HttpHeaders): Observable<Starship> {
    const starshipCache = this.cacheService.getData<Starship>(
      this.cacheKey,
      id
    );
    if (starshipCache) {
      return of(starshipCache);
    }

    return this.httpClient
      .get<Partial<Starship>>(
        `${environment.api_url}${this.resourceUrlApi}/${id}/`,
        { headers }
      )
      .pipe(
        map((starship) => {
          starship.id = getIdByUrl(starship.url);
          starship.image = `assets/images/starships/${starship.id}.jpg`;
          return starship as Starship;
        }),
        tap((starship) => {
          this.cacheService.saveData<Starship>(
            this.cacheKey,
            starship.id,
            starship
          );
        })
      );
  }
}
