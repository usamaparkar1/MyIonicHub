import { TestBed } from '@angular/core/testing';

import { CbHomeService } from './cb-home.service';

describe('CbHomeService', () => {
  let service: CbHomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CbHomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
