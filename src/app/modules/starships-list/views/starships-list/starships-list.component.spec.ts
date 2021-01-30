import { starshipPaginationMock } from '../../../../../assets/mocks/starships-data/starships-data.mock';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { StarshipsListComponent } from './starships-list.component';
import { StarshipsDataService } from '@services/starships-data/starships-data.service';
import { StarshipsDataMockService } from 'src/assets/mocks/starships-data/starships-data.mock.service';
import { StarshipsListService } from './starships-list.service';

describe('StarshipsListComponent', () => {
  let component: StarshipsListComponent;
  let fixture: ComponentFixture<StarshipsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StarshipsListComponent],
      imports: [HttpClientModule],
      providers: [
        { provide: StarshipsDataService, useClass: StarshipsDataMockService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StarshipsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should starships$', (done) => {
    component.starships$.subscribe((res) => {
      expect(res).toEqual(starshipPaginationMock.results);
      done();
    });
  });

  it('should onScroll call getMoreStarships', () => {
    const starshipsListService = TestBed.inject(StarshipsListService);
    spyOn(starshipsListService, 'getMoreStarships');
    component.onScroll();
    expect(starshipsListService.getMoreStarships).toHaveBeenCalled();
  });

  it('should ngOnDestroy call resetPages', () => {
    const starshipsListService = TestBed.inject(StarshipsListService);
    spyOn(starshipsListService, 'resetPages');
    component.ngOnDestroy();
    expect(starshipsListService.resetPages).toHaveBeenCalled();
  });
});
