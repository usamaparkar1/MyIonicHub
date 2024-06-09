import { TestBed } from '@angular/core/testing';

import { CbRightsService } from './cb-rights.service';

describe('CbRightsService', () => {
  let service: CbRightsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CbRightsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
