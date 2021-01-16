import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOwnHousesComponent } from './list-own-houses.component';

describe('ListOwnHousesComponent', () => {
  let component: ListOwnHousesComponent;
  let fixture: ComponentFixture<ListOwnHousesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOwnHousesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOwnHousesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
