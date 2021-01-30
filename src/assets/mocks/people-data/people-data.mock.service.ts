import { Observable, of } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { People } from '@models/people.interface';
import { peopleMock } from './people-data.mock';

@Injectable({
  providedIn: 'root'
})
export class PeopleDataMockService {
  constructor() {}

  getPeopleById(id: string, headers: HttpHeaders): Observable<People> {
    return of(peopleMock);
  }
}
