import { TestBed, async, inject } from '@angular/core/testing';

import { ProjectSaveGuard } from './project-save.guard';

describe('ProjectSaveGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectSaveGuard]
    });
  });

  it('should ...', inject([ProjectSaveGuard], (guard: ProjectSaveGuard) => {
    expect(guard).toBeTruthy();
  }));
});
