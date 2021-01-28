import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { StarshipDetailService } from './starship-detail.service';

describe('StarshipDetailService', () => {
  let service: StarshipDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(StarshipDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
