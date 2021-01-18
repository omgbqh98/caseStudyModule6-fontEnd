import { TestBed } from '@angular/core/testing';

import { StaticsticsByMonthService } from './staticstics-by-month.service';

describe('StaticsticsByMonthService', () => {
  let service: StaticsticsByMonthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StaticsticsByMonthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
