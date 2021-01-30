import { Pagination } from '../../../app/models/pagination.interface';
import { peopleMock } from '../people-data/people-data.mock';
import { filmMock } from '../films-data/films-data.mock';
import { Starship } from '../../../app/models/starship.interface';

export const starshipMock: Starship = {
  id: '12',
  name: 'X-wing',
  model: 'T-65 X-wing',
  manufacturer: 'Incom Corporation',
  cost_in_credits: '149999',
  length: '12.5',
  max_atmosphering_speed: '1050',
  crew: '1',
  passengers: '0',
  cargo_capacity: '110',
  consumables: '1 week',
  hyperdrive_rating: '1.0',
  MGLT: '100',
  starship_class: 'Starfighter',
  pilots: [
    'http://swapi.dev/api/people/1/',
    'http://swapi.dev/api/people/9/',
    'http://swapi.dev/api/people/18/',
    'http://swapi.dev/api/people/19/'
  ],
  films: [
    'http://swapi.dev/api/films/1/',
    'http://swapi.dev/api/films/2/',
    'http://swapi.dev/api/films/3/'
  ],
  created: '2014-12-12T11:19:05.340000Z',
  edited: '2014-12-20T21:23:49.886000Z',
  url: 'http://swapi.dev/api/starships/12/',
  image: 'assets/images/starships/12.jpg'
};

export const starshipCompleteMock: Starship = {
  id: '12',
  name: 'X-wing',
  model: 'T-65 X-wing',
  manufacturer: 'Incom Corporation',
  cost_in_credits: '149999',
  length: '12.5',
  max_atmosphering_speed: '1050',
  crew: '1',
  passengers: '0',
  cargo_capacity: '110',
  consumables: '1 week',
  hyperdrive_rating: '1.0',
  MGLT: '100',
  starship_class: 'Starfighter',
  pilots: [peopleMock, peopleMock, peopleMock, peopleMock],
  films: [filmMock, filmMock, filmMock],
  created: '2014-12-12T11:19:05.340000Z',
  edited: '2014-12-20T21:23:49.886000Z',
  url: 'http://swapi.dev/api/starships/12/',
  image: 'assets/images/starships/12.jpg'
};

export const starshipPaginationMock: Pagination<Starship> = {
  count: 36,
  next: 'http://swapi.dev/api/starships/?page=2',
  previous: null,
  results: [
    {
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
    },
    {
      id: '3',
      name: 'Star Destroyer',
      model: 'Imperial I-class Star Destroyer',
      manufacturer: 'Kuat Drive Yards',
      cost_in_credits: '150000000',
      length: '1,600',
      max_atmosphering_speed: '975',
      crew: '47,060',
      passengers: 'n/a',
      cargo_capacity: '36000000',
      consumables: '2 years',
      hyperdrive_rating: '2.0',
      MGLT: '60',
      starship_class: 'Star Destroyer',
      pilots: [],
      films: [
        'http://swapi.dev/api/films/1/',
        'http://swapi.dev/api/films/2/',
        'http://swapi.dev/api/films/3/'
      ],
      created: '2014-12-10T15:08:19.848000Z',
      edited: '2014-12-20T21:23:49.870000Z',
      url: 'http://swapi.dev/api/starships/3/',
      image: 'assets/images/starships/3.jpg'
    },
    {
      id: '5',
      name: 'Sentinel-class landing craft',
      model: 'Sentinel-class landing craft',
      manufacturer: 'Sienar Fleet Systems, Cyngus Spaceworks',
      cost_in_credits: '240000',
      length: '38',
      max_atmosphering_speed: '1000',
      crew: '5',
      passengers: '75',
      cargo_capacity: '180000',
      consumables: '1 month',
      hyperdrive_rating: '1.0',
      MGLT: '70',
      starship_class: 'landing craft',
      pilots: [],
      films: ['http://swapi.dev/api/films/1/'],
      created: '2014-12-10T15:48:00.586000Z',
      edited: '2014-12-20T21:23:49.873000Z',
      url: 'http://swapi.dev/api/starships/5/',
      image: 'assets/images/starships/5.jpg'
    }
  ]
};
