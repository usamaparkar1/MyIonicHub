import { TestBed } from '@angular/core/testing';

import { CbSupportGuard } from './cb-support.guard';

describe('CbSupportGuard', () => {
  let guard: CbSupportGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CbSupportGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
