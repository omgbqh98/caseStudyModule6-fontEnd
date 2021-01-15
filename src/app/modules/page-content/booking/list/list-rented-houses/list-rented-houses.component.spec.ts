import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRentedHousesComponent } from './list-rented-houses.component';

describe('ListRentedHousesComponent', () => {
  let component: ListRentedHousesComponent;
  let fixture: ComponentFixture<ListRentedHousesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRentedHousesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRentedHousesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
