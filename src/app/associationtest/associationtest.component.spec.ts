import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociationtestComponent } from './associationtest.component';

describe('AssociationtestComponent', () => {
  let component: AssociationtestComponent;
  let fixture: ComponentFixture<AssociationtestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssociationtestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociationtestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
