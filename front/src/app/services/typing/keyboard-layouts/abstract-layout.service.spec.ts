import { TestBed } from '@angular/core/testing';

import { AbstractLayoutService } from './abstract-layout.service';

describe('AbstractLayoutService', () => {
  let service: AbstractLayoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbstractLayoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
