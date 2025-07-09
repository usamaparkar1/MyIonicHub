import { TestBed } from '@angular/core/testing';

import { CbSupportNewsService } from './cb-support-news.service';

describe('CbSupportNewsService', () => {
  let service: CbSupportNewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CbSupportNewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
