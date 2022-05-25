import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociationlistComponent } from './associationlist.component';

describe('AssociationlistComponent', () => {
  let component: AssociationlistComponent;
  let fixture: ComponentFixture<AssociationlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssociationlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociationlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
