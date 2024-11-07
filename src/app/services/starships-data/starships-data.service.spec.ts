import {
  HttpClientModule,
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { StarshipsDataService } from './starships-data.service';
import { CacheService } from '@services/cache/cache.service';

import { starshipMock } from '@assets/mocks/starships-data/starships-data.mock';
import { starshipPaginationMock } from '@assets/mocks/starships-data/starships-data.mock';

describe('StarshipsDataService', () => {
  let service: StarshipsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(StarshipsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should getStarshipsList', (done) => {
    const httpClient = TestBed.inject(HttpClient);
    spyOn(httpClient, 'get').and.returnValue(of(starshipPaginationMock));

    const cacheService = TestBed.inject(CacheService);
    spyOn(cacheService, 'saveData');

    const headers = new HttpHeaders();

    service.getStarshipsList(1, headers).subscribe((res) => {
      expect(res).toEqual(starshipPaginationMock);
      expect(cacheService.saveData).toHaveBeenCalled();
      done();
    });
  });

  it('should getStarshipsList collect information from cache', (done) => {
    const starshipPaginationModified = { ...starshipPaginationMock };
    starshipPaginationModified.results = [];

    const cacheService = TestBed.inject(CacheService);
    spyOn(cacheService, 'getData').and.returnValue(starshipPaginationMock);

    const httpClient = TestBed.inject(HttpClient);
    spyOn(httpClient, 'get').and.returnValue(of(starshipPaginationModified));

    const headers = new HttpHeaders();

    service.getStarshipsList(1, headers).subscribe((res) => {
      expect(res).toEqual(starshipPaginationMock);
      done();
    });
  });

  it('should getStarshipsList without page default is 1', (done) => {
    const cacheService = TestBed.inject(CacheService);
    spyOn(cacheService, 'getData').and.returnValue(starshipPaginationMock);

    const headers = new HttpHeaders();

    service.getStarshipsList(undefined, headers).subscribe((res) => {
      expect(cacheService.getData).toHaveBeenCalledWith('starships', 'page=1');
      done();
    });
  });

  it('should getStarshipById', (done) => {
    const httpClient = TestBed.inject(HttpClient);
    spyOn(httpClient, 'get').and.returnValue(of(starshipMock));

    const cacheService = TestBed.inject(CacheService);
    spyOn(cacheService, 'saveData');

    const headers = new HttpHeaders();

    service.getStarshipById('1', headers).subscribe((res) => {
      expect(res).toEqual(starshipMock);
      expect(cacheService.saveData).toHaveBeenCalled();
      done();
    });
  });

  it('should getStarshipById collect information from cache', (done) => {
    const starshipModified = { ...starshipMock };
    starshipModified.id = '99';

    const cacheService = TestBed.inject(CacheService);
    spyOn(cacheService, 'getData').and.returnValue(starshipMock);

    const httpClient = TestBed.inject(HttpClient);
    spyOn(httpClient, 'get').and.returnValue(of(starshipModified));

    const headers = new HttpHeaders();

    service.getStarshipById('1', headers).subscribe((res) => {
      expect(res).toEqual(starshipMock);
      done();
    });
  });
});
