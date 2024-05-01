import { TestBed } from '@angular/core/testing';

import { CbNewsService } from './cb-news.service';

describe('CbNewsService', () => {
  let service: CbNewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CbNewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
