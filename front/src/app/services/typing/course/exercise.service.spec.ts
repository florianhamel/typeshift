import { TestBed } from '@angular/core/testing';

import { ExerciseService } from './exercise.service';

describe('CourseService', () => {
  let service: ExerciseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExerciseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
