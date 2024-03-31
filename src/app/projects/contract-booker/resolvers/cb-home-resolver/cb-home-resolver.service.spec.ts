import { TestBed } from '@angular/core/testing';

import { CbHomeResolverService } from './cb-home-resolver.service';

describe('CbHomeResolverService', () => {
  let service: CbHomeResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CbHomeResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
