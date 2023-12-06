import { TestBed } from '@angular/core/testing';

import { AbstractSessionService } from './abstract-session.service';

describe('AbstractSessionService', () => {
  let service: AbstractSessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbstractSessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
