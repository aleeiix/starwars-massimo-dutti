import { of } from 'rxjs';
import {
  HttpClientModule,
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { PeopleDataService } from './people-data.service';
import { peopleMock } from 'src/assets/mocks/people-data/people-data.mock';
import { CacheService } from '@services/cache/cache.service';

describe('PeopleDataService', () => {
  let service: PeopleDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(PeopleDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should getPeopleById', (done) => {
    const httpClient = TestBed.inject(HttpClient);
    spyOn(httpClient, 'get').and.returnValue(of(peopleMock));

    const cacheService = TestBed.inject(CacheService);
    spyOn(cacheService, 'saveData');

    const headers = new HttpHeaders();

    service.getPeopleById('1', headers).subscribe((res) => {
      expect(res.id).toEqual('1');
      expect(cacheService.saveData).toHaveBeenCalled();
      done();
    });
  });

  it('should getPeopleById collect information from cache', (done) => {
    const peopleModified = { ...peopleMock };
    peopleModified.id = '2';

    const cacheService = TestBed.inject(CacheService);
    spyOn(cacheService, 'getData').and.returnValue(peopleMock);

    const httpClient = TestBed.inject(HttpClient);
    spyOn(httpClient, 'get').and.returnValue(of(peopleModified));

    const headers = new HttpHeaders();

    service.getPeopleById('1', headers).subscribe((res) => {
      expect(res.id).toEqual('1');
      done();
    });
  });
});
