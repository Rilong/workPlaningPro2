import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationProjectComponent } from './creation-project.component';

describe('CreationProjectComponent', () => {
  let component: CreationProjectComponent;
  let fixture: ComponentFixture<CreationProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreationProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreationProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
