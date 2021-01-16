import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseDetailViewComponent } from './house-detail-view.component';

describe('HouseDetailViewComponent', () => {
  let component: HouseDetailViewComponent;
  let fixture: ComponentFixture<HouseDetailViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseDetailViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
