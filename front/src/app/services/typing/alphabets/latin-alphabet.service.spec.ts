import { TestBed } from '@angular/core/testing';

import { LatinAlphabetService } from './latin-alphabet.service';

describe('LatinAlphabetService', () => {
  let service: LatinAlphabetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LatinAlphabetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
