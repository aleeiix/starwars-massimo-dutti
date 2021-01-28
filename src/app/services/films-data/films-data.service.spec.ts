import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { FilmsDataService } from './films-data.service';

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
});
