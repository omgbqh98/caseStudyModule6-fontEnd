import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHousesImgComponent } from './create-houses-img.component';

describe('CreateHousesImgComponent', () => {
  let component: CreateHousesImgComponent;
  let fixture: ComponentFixture<CreateHousesImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateHousesImgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateHousesImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
