import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CSVComponent } from './csv.component';

describe('CSVComponent', () => {
  let component: CSVComponent;
  let fixture: ComponentFixture<CSVComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CSVComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CSVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
