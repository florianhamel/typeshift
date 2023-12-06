import { TestBed } from '@angular/core/testing';

import { ExerciseSessionService } from './exercise-session.service';

describe('ExerciseSessionService', () => {
  let service: ExerciseSessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExerciseSessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
