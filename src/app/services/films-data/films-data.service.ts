import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Film } from '@models/film.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FilmsDataService {
  private readonly resourceUrlApi = '/films';

  constructor(private httpClient: HttpClient) {}

  getFilmById(id: string): Observable<Film> {
    return this.httpClient
      .get<Partial<Film>>(`${environment.api_url}${this.resourceUrlApi}/${id}/`)
      .pipe(
        map((film) => {
          film.id = film.url.split('/').slice(-2)[0];
          return film as Film;
        })
      );
  }
}
