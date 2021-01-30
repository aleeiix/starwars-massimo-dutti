import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Starship } from '@models/starship.interface';
import { Pagination } from '@models/pagination.interface';

import { starshipMock, starshipPaginationMock } from './starships-data.mock';

@Injectable({
  providedIn: 'root'
})
export class StarshipsDataMockService {
  constructor() {}

  getStarshipsList(
    page: number = 1,
    headers: HttpHeaders
  ): Observable<Pagination<Starship>> {
    return of(starshipPaginationMock);
  }

  getStarshipById(id: string, headers: HttpHeaders): Observable<Starship> {
    return of(starshipMock);
  }
}
