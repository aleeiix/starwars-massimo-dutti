import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { People } from '@models/people.interface';
import { environment } from 'src/environments/environment';
import { CacheService } from '@services/cache/cache.service';

@Injectable({
  providedIn: 'root'
})
export class PeopleDataService {
  private readonly resourceUrlApi = '/people';
  private readonly cacheKey = 'people';

  constructor(
    private httpClient: HttpClient,
    private cacheService: CacheService
  ) {}

  getPeopleById(id: string): Observable<People> {
    const peopleCache = this.cacheService.getData<People>(this.cacheKey, id);
    if (peopleCache) {
      return of(peopleCache);
    }

    return this.httpClient
      .get<Partial<People>>(
        `${environment.api_url}${this.resourceUrlApi}/${id}/`
      )
      .pipe(
        map((people) => {
          people.id = people.url.split('/').slice(-2)[0];
          return people as People;
        }),
        tap((people) => {
          this.cacheService.saveData<People>(this.cacheKey, people.id, people);
        })
      );
  }
}
