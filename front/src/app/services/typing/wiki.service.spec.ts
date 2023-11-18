import { TestBed } from '@angular/core/testing';

import { WikiService } from './wiki.service';
import { HttpClientModule } from '@angular/common/http';

describe('WikiService', () => {
  let service: WikiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ]
    });
    service = TestBed.inject(WikiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should format text', () => {
    // GIVEN
    const text: string = 'Hello \tSpino';

    // WHEN
    const result: string = service.formatExtract(text);

    // THEN
    expect(result).toBe('Hello  Spino');
  });
});
