import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRentHousesByTimeComponent } from './list-rent-houses-by-time.component';

describe('ListRentHousesByTimeComponent', () => {
  let component: ListRentHousesByTimeComponent;
  let fixture: ComponentFixture<ListRentHousesByTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRentHousesByTimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRentHousesByTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
