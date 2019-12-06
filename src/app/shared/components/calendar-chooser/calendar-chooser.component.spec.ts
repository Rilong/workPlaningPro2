import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarChooserComponent } from './calendar-chooser.component';

describe('CalendarChooserComponent', () => {
  let component: CalendarChooserComponent;
  let fixture: ComponentFixture<CalendarChooserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarChooserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
