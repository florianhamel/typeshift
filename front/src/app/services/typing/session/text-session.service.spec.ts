import { TestBed } from '@angular/core/testing';

import { TextSessionService } from './text-session.service';

describe('SessionService', () => {
  let service: TextSessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextSessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
