import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarViewPageComponent } from './calendar-view-page.component';

describe('CalendarViewPageComponent', () => {
  let component: CalendarViewPageComponent;
  let fixture: ComponentFixture<CalendarViewPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarViewPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
