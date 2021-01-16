import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostedHouseEditComponent } from './posted-house-edit.component';

describe('PostedHouseEditComponent', () => {
  let component: PostedHouseEditComponent;
  let fixture: ComponentFixture<PostedHouseEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostedHouseEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostedHouseEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
