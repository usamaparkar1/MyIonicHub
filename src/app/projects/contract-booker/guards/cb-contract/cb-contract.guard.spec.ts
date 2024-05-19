import { TestBed } from '@angular/core/testing';

import { CbContractGuard } from './cb-contract.guard';

describe('CbContractGuard', () => {
  let guard: CbContractGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CbContractGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
