import { TestBed } from '@angular/core/testing';

import { StarshipsListService } from './starships-list.service';

describe('StarshipsListService', () => {
  let service: StarshipsListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StarshipsListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
