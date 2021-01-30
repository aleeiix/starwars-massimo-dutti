import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { StarshipDetailComponent } from './starship-detail.component';
import { StarshipDetailService } from './starship-detail.service';

import { starshipCompleteMock } from '@assets/mocks/starships-data/starships-data.mock';

import { environment } from '@environments/environment';

describe('StarshipDetailComponent', () => {
  let component: StarshipDetailComponent;
  let fixture: ComponentFixture<StarshipDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StarshipDetailComponent],
      imports: [RouterTestingModule, HttpClientModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 1 })
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StarshipDetailComponent);
    const starshipDetailService = TestBed.inject(StarshipDetailService);

    spyOn(starshipDetailService, 'getStarshipById').and.returnValue(
      of(starshipCompleteMock)
    );

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get starship', () => {
    expect(component.starship).toEqual(starshipCompleteMock);
  });

  it('should showImageNotFound', () => {
    component.showImageNotFound();
    expect(component.error).toBeTrue();
  });

  it('should imageStyle without error', () => {
    expect(component.imageStyle).toEqual({
      'background-image': `url(${starshipCompleteMock.image})`
    });
  });

  it('should imageStyle with error', () => {
    component.showImageNotFound();
    expect(component.imageStyle).toEqual({
      'background-image': `url(${environment.image_not_found})`
    });
  });
});
