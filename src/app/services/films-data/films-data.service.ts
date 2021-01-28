import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Film } from '@models/film.interface';
import { environment } from 'src/environments/environment';
import { CacheService } from '@services/cache/cache.service';

@Injectable({
  providedIn: 'root'
})
export class FilmsDataService {
  private readonly resourceUrlApi = '/films';
  private readonly cacheKey = 'films';

  constructor(
    private httpClient: HttpClient,
    private cacheService: CacheService
  ) {}

  getFilmById(id: string): Observable<Film> {
    const filmCache = this.cacheService.getData<Film>(this.cacheKey, id);
    if (filmCache) {
      return of(filmCache);
    }

    return this.httpClient
      .get<Partial<Film>>(`${environment.api_url}${this.resourceUrlApi}/${id}/`)
      .pipe(
        map((film) => {
          film.id = film.url.split('/').slice(-2)[0];
          return film as Film;
        }),
        tap((film) => {
          this.cacheService.saveData<Film>(this.cacheKey, film.id, film);
        })
      );
  }
}
