import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestplayerComponentComponent } from './testplayer-component.component';

describe('TestplayerComponentComponent', () => {
  let component: TestplayerComponentComponent;
  let fixture: ComponentFixture<TestplayerComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestplayerComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestplayerComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
