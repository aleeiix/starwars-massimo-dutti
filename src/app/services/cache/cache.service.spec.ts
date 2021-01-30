import { TestBed } from '@angular/core/testing';

import { CacheService } from './cache.service';

import { starshipMock } from '@assets/mocks/starships-data/starships-data.mock';

describe('CacheService', () => {
  let service: CacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('saveData should save starship and getData return starship', () => {
    service.saveData('starships', '1', starshipMock);
    expect(service.getData('starships', '1')).toEqual(starshipMock);
  });

  it('removeData should remove starship', () => {
    service.saveData('starships', '1', starshipMock);
    service.removeData('starships', '1');
    expect(service.getData('starships', '1')).toEqual(undefined);
  });

  it('removeData should remove starship but not remove all', () => {
    service.saveData('starships', '1', starshipMock);
    service.saveData('starships', '2', starshipMock);
    service.removeData('starships', '1');
    expect(service.getData('starships', '1')).toEqual(undefined);
    expect(service.getData('starships', '2')).toEqual(starshipMock);
  });
});
