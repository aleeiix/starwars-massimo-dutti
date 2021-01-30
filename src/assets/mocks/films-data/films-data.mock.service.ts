import { Observable, of } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Film } from '@models/film.interface';
import { filmMock } from './films-data.mock';

@Injectable({
  providedIn: 'root'
})
export class FilmsDataMockService {
  constructor() {}

  getFilmById(id: string, headers: HttpHeaders): Observable<Film> {
    return of(filmMock);
  }
}
