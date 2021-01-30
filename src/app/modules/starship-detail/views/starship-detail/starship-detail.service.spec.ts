import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { StarshipDetailService } from './starship-detail.service';
import { StarshipsDataService } from '@services/starships-data/starships-data.service';
import { StarshipsDataMockService } from 'src/assets/mocks/starships-data/starships-data.mock.service';
import { FilmsDataService } from '@services/films-data/films-data.service';
import { PeopleDataService } from '@services/people-data/people-data.service';
import { FilmsDataMockService } from 'src/assets/mocks/films-data/films-data.mock.service';
import { PeopleDataMockService } from 'src/assets/mocks/people-data/people-data.mock.service';
import { starshipCompleteMock } from 'src/assets/mocks/starships-data/starships-data.mock';

import { starshipMock } from '../../../../../assets/mocks/starships-data/starships-data.mock';
import { peopleMock } from 'src/assets/mocks/people-data/people-data.mock';
import { filmMock } from '../../../../../assets/mocks/films-data/films-data.mock';

describe('StarshipDetailService', () => {
  let service: StarshipDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        { provide: StarshipsDataService, useClass: StarshipsDataMockService },
        { provide: FilmsDataService, useClass: FilmsDataMockService },
        { provide: PeopleDataService, useClass: PeopleDataMockService }
      ]
    });
    service = TestBed.inject(StarshipDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should getStarshipById', (done) => {
    service.getStarshipById('1').subscribe((res) => {
      expect(res).toEqual(starshipCompleteMock);
      done();
    });
  });

  it('should getStarshipById no films', (done) => {
    const starshipsDataService = TestBed.inject(StarshipsDataService);
    const peopleDataService = TestBed.inject(PeopleDataService);

    const starship = { ...starshipMock, films: [] };
    const starshipComplete = { ...starshipCompleteMock, films: [] };

    spyOn(starshipsDataService, 'getStarshipById').and.returnValue(
      of(starship)
    );

    spyOn(peopleDataService, 'getPeopleById').and.returnValue(of(peopleMock));

    service.getStarshipById('1').subscribe((res) => {
      expect(res).toEqual(starshipComplete);
      done();
    });
  });

  it('should getStarshipById no pilots', (done) => {
    const starshipsDataService = TestBed.inject(StarshipsDataService);
    const filmsDataService = TestBed.inject(FilmsDataService);

    const starship = { ...starshipMock, pilots: [] };
    const starshipComplete = { ...starshipCompleteMock, pilots: [] };

    spyOn(starshipsDataService, 'getStarshipById').and.returnValue(
      of(starship)
    );

    spyOn(filmsDataService, 'getFilmById').and.returnValue(of(filmMock));

    service.getStarshipById('1').subscribe((res) => {
      expect(res).toEqual(starshipComplete);
      done();
    });
  });
});
