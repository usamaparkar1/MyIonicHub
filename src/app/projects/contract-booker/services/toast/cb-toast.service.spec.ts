import { TestBed } from '@angular/core/testing';

import { CbToastService } from './cb-toast.service';

describe('CbToastService', () => {
  let service: CbToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CbToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
