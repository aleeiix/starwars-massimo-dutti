import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { PeopleDataService } from './people-data.service';

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
});
