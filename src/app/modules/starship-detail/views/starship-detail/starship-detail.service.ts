import { Injectable } from '@angular/core';

import { forkJoin, Observable, of } from 'rxjs';
import { switchMap, map as maprxjs } from 'rxjs/operators';

import { StarshipsDataService } from '@services/starships-data/starships-data.service';
import { PeopleDataService } from '@services/people-data/people-data.service';
import { FilmsDataService } from '@services/films-data/films-data.service';
import { Starship } from '@models/starship.interface';
import { createHeaders, getIdByUrl } from '@utils/utils';

@Injectable({
  providedIn: 'root'
})
export class StarshipDetailService {
  constructor(
    private starshipsDataService: StarshipsDataService,
    private filmsDataService: FilmsDataService,
    private peopleDataService: PeopleDataService
  ) {}

  getStarshipById(id: string): Observable<Starship> {
    return this.starshipsDataService
      .getStarshipById(id, createHeaders(true))
      .pipe(
        switchMap((starship) => {
          if (starship.films.length === 0) {
            return of(starship);
          }
          const filmsObservables = (starship.films as string[]).map((film) =>
            this.filmsDataService.getFilmById(
              getIdByUrl(film),
              createHeaders(true)
            )
          );
          return forkJoin(filmsObservables).pipe(
            maprxjs((films) => {
              return { ...starship, films } as Starship;
            })
          );
        }),
        switchMap((starship) => {
          if (starship.pilots.length === 0) {
            return of(starship);
          }
          const pilotsObservables = (starship.pilots as string[]).map((pilot) =>
            this.peopleDataService.getPeopleById(
              getIdByUrl(pilot),
              createHeaders(true)
            )
          );
          return forkJoin(pilotsObservables).pipe(
            maprxjs((pilots) => {
              return { ...starship, pilots } as Starship;
            })
          );
        })
      );
  }
}
