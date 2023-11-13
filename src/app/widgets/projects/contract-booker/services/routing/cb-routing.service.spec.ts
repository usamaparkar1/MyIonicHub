import { TestBed } from '@angular/core/testing';

import { CbRoutingService } from './cb-routing.service';

describe('CbRoutingService', () => {
  let service: CbRoutingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CbRoutingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
