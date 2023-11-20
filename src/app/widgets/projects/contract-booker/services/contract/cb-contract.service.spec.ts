import { TestBed } from '@angular/core/testing';

import { CbContractService } from './cb-contract.service';

describe('CbContractService', () => {
  let service: CbContractService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CbContractService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
