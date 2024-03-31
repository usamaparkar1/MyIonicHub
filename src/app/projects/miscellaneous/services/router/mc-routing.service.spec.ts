import { TestBed } from '@angular/core/testing';

import { McRoutingService } from './mc-routing.service';

describe('McRoutingService', () => {
  let service: McRoutingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(McRoutingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
