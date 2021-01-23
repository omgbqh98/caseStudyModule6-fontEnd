import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserShowForAllComponent } from './user-show-for-all.component';

describe('UserShowForAllComponent', () => {
  let component: UserShowForAllComponent;
  let fixture: ComponentFixture<UserShowForAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserShowForAllComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserShowForAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
