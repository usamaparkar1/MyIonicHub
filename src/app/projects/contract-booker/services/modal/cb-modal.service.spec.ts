import { TestBed } from '@angular/core/testing';

import { CbModalService } from './cb-modal.service';

describe('CbModalService', () => {
  let service: CbModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CbModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
