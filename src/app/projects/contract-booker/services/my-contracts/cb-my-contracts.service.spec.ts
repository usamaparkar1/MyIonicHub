import { TestBed } from '@angular/core/testing';

import { CbMyContractsService } from './cb-my-contracts.service';

describe('CbMyContractsService', () => {
  let service: CbMyContractsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CbMyContractsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
