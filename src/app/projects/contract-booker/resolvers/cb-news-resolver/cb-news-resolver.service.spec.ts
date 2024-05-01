import { TestBed } from '@angular/core/testing';

import { CbNewsResolverService } from './cb-news-resolver.service';

describe('CbNewsResolverService', () => {
  let service: CbNewsResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CbNewsResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
