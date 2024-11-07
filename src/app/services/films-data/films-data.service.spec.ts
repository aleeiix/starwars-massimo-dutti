import {
  HttpClientModule,
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { FilmsDataService } from './films-data.service';
import { CacheService } from '@services/cache/cache.service';

import { filmMock } from '@assets/mocks/films-data/films-data.mock';

describe('FilmsDataService', () => {
  let service: FilmsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(FilmsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should getFilmById', (done) => {
    const httpClient = TestBed.inject(HttpClient);
    spyOn(httpClient, 'get').and.returnValue(of(filmMock));

    const cacheService = TestBed.inject(CacheService);
    spyOn(cacheService, 'saveData');

    const headers = new HttpHeaders();

    service.getFilmById('1', headers).subscribe((res) => {
      expect(res.id).toEqual('1');
      expect(cacheService.saveData).toHaveBeenCalled();
      done();
    });
  });

  it('should getFilmById collect information from cache', (done) => {
    const filmModified = { ...filmMock };
    filmModified.id = '2';

    const cacheService = TestBed.inject(CacheService);
    spyOn(cacheService, 'getData').and.returnValue(filmMock);

    const httpClient = TestBed.inject(HttpClient);
    spyOn(httpClient, 'get').and.returnValue(of(filmModified));

    const headers = new HttpHeaders();

    service.getFilmById('1', headers).subscribe((res) => {
      expect(res.id).toEqual('1');
      done();
    });
  });
});
