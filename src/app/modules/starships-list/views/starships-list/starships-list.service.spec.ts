import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { StarshipsListService } from './starships-list.service';

describe('StarshipsListService', () => {
  let service: StarshipsListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(StarshipsListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
