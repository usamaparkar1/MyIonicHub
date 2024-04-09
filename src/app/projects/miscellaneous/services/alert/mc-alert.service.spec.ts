import { TestBed } from '@angular/core/testing';

import { McAlertService } from './mc-alert.service';

describe('McAlertService', () => {
  let service: McAlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(McAlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
