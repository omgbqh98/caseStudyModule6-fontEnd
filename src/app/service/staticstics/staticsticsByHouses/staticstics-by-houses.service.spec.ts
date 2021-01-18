import { TestBed } from '@angular/core/testing';

import { StaticsticsByHousesService } from './staticstics-by-houses.service';

describe('StaticsticsByHousesService', () => {
  let service: StaticsticsByHousesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StaticsticsByHousesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
