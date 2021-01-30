import { of } from 'rxjs';
import { starshipPaginationMock } from '../../../../../assets/mocks/starships-data/starships-data.mock';
import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { StarshipsListService } from './starships-list.service';
import { StarshipsDataService } from '@services/starships-data/starships-data.service';
import { StarshipsDataMockService } from 'src/assets/mocks/starships-data/starships-data.mock.service';

describe('StarshipsListService', () => {
  let service: StarshipsListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        { provide: StarshipsDataService, useClass: StarshipsDataMockService }
      ]
    });
    service = TestBed.inject(StarshipsListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should getStarships save result in starshipsSubject', (done) => {
    service.getStarships();

    service.starships$.subscribe((res) => {
      expect(res).toEqual(starshipPaginationMock.results);
      done();
    });
  });

  it('should getMoreStarships save result in starshipsSubject', (done) => {
    service.getMoreStarships();

    service.starships$.subscribe((res) => {
      expect(res).toEqual(starshipPaginationMock.results);
      done();
    });
  });

  it('should getMoreStarships is finish true', () => {
    const starshipPagination = { ...starshipPaginationMock };
    starshipPagination.next = null;

    const starshipsDataService = TestBed.inject(StarshipsDataService);
    const spy = spyOn(starshipsDataService, 'getStarshipsList').and.returnValue(
      of(starshipPagination)
    );

    service.getStarships();
    service.getMoreStarships();

    expect(spy.calls.count()).toEqual(1);
  });
});
