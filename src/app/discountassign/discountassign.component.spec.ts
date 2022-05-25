import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountassignComponent } from './discountassign.component';

describe('DiscountassignComponent', () => {
  let component: DiscountassignComponent;
  let fixture: ComponentFixture<DiscountassignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscountassignComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountassignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
