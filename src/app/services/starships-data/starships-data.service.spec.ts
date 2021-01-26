import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { StarshipsDataService } from './starships-data.service';

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
});
