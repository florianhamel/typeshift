import { TestBed } from '@angular/core/testing';

import { UsInternationalLayout } from './us-international-layout.service';

describe('UsInternationalService', () => {
  let service: UsInternationalLayout;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsInternationalLayout);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
