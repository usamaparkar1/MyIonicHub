import { TestBed } from '@angular/core/testing';

import { McHelperService } from './mc-helper.service';

describe('McHelperService', () => {
  let service: McHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(McHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
