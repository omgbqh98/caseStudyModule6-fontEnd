import { TestBed } from '@angular/core/testing';

import { HousesImgService } from './houses-img.service';

describe('HousesImgService', () => {
  let service: HousesImgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HousesImgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
