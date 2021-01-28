import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { People } from '@models/people.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PeopleDataService {
  private readonly resourceUrlApi = '/people';

  constructor(private httpClient: HttpClient) {}

  getPeopleById(id: string): Observable<People> {
    return this.httpClient
      .get<Partial<People>>(
        `${environment.api_url}${this.resourceUrlApi}/${id}/`
      )
      .pipe(
        map((people) => {
          people.id = people.url.split('/').slice(-2)[0];
          return people as People;
        })
      );
  }
}
