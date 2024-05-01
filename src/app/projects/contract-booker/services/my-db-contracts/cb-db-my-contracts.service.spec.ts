import { TestBed } from '@angular/core/testing';

import { CbDbMyContractsService } from './cb-db-my-contracts.service';

describe('CbDbMyContractsService', () => {
  let service: CbDbMyContractsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CbDbMyContractsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
