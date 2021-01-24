import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHousesOfHostComponent } from './list-houses-of-host.component';

describe('ListHousesOfHostComponent', () => {
  let component: ListHousesOfHostComponent;
  let fixture: ComponentFixture<ListHousesOfHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListHousesOfHostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListHousesOfHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
