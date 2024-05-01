import { TestBed } from '@angular/core/testing';

import { CbMyContractsResolverService } from './cb-my-contracts-resolver.service';

describe('CbMyContractsResolverService', () => {
  let service: CbMyContractsResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CbMyContractsResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
