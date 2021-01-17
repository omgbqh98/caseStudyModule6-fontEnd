import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostedHoesImgComponent } from './posted-hoes-img.component';

describe('PostedHoesImgComponent', () => {
  let component: PostedHoesImgComponent;
  let fixture: ComponentFixture<PostedHoesImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostedHoesImgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostedHoesImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
