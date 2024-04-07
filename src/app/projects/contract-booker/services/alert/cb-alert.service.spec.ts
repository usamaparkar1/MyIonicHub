import { TestBed } from '@angular/core/testing';

import { CbAlertService } from './cb-alert.service';

describe('CbAlertService', () => {
  let service: CbAlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CbAlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
