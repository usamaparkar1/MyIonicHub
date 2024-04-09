import { TestBed } from '@angular/core/testing';

import { McToastService } from './mc-toast.service';

describe('McToastService', () => {
  let service: McToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(McToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
