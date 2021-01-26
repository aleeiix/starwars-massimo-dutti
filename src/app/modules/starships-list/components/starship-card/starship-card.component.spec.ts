import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarshipCardComponent } from './starship-card.component';

describe('StarshipCardComponent', () => {
  let component: StarshipCardComponent;
  let fixture: ComponentFixture<StarshipCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StarshipCardComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StarshipCardComponent);
    component = fixture.componentInstance;
    component.starship = {
      id: '2',
      name: 'CR90 corvette',
      model: 'CR90 corvette',
      manufacturer: 'Corellian Engineering Corporation',
      cost_in_credits: '3500000',
      length: '150',
      max_atmosphering_speed: '950',
      crew: '30-165',
      passengers: '600',
      cargo_capacity: '3000000',
      consumables: '1 year',
      hyperdrive_rating: '2.0',
      MGLT: '60',
      starship_class: 'corvette',
      pilots: [],
      films: [
        'http://swapi.dev/api/films/1/',
        'http://swapi.dev/api/films/3/',
        'http://swapi.dev/api/films/6/'
      ],
      created: '2014-12-10T14:20:33.369000Z',
      edited: '2014-12-20T21:23:49.867000Z',
      url: 'http://swapi.dev/api/starships/2/',
      image: 'assets/images/starships/2.jpg'
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
