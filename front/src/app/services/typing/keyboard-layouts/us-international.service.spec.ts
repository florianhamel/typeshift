import { TestBed } from '@angular/core/testing';

import { UsInternationalService } from './us-international.service';

describe('UsInternationalService', () => {
  let service: UsInternationalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsInternationalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
