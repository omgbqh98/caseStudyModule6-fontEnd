import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseDetailPostedComponent } from './house-detail-posted.component';

describe('HouseDetailPostedComponent', () => {
  let component: HouseDetailPostedComponent;
  let fixture: ComponentFixture<HouseDetailPostedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseDetailPostedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseDetailPostedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
