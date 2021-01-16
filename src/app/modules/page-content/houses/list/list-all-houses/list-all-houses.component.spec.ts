import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAllHousesComponent } from './list-all-houses.component';

describe('ListAllHousesComponent', () => {
  let component: ListAllHousesComponent;
  let fixture: ComponentFixture<ListAllHousesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAllHousesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAllHousesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
