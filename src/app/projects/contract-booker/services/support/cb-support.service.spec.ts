import { TestBed } from '@angular/core/testing';

import { CbSupportService } from './cb-support.service';

describe('CbSupportService', () => {
  let service: CbSupportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CbSupportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
