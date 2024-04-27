import { TestBed } from '@angular/core/testing';

import { CbCartResolverService } from './cb-cart-resolver.service';

describe('CbCartResolverService', () => {
  let service: CbCartResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CbCartResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
