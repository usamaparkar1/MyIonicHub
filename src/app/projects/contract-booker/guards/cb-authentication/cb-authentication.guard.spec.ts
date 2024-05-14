import { TestBed } from '@angular/core/testing';

import { CbAuthenticationGuard } from './cb-authentication.guard';

describe('CbAuthenticationGuard', () => {
  let guard: CbAuthenticationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CbAuthenticationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
