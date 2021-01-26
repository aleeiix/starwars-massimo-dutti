import { TestBed } from '@angular/core/testing';

import { StarshipsDataService } from './starships-data.service';

describe('StarshipsDataService', () => {
  let service: StarshipsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StarshipsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
