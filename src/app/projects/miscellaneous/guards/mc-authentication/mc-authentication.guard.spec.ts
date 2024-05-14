import { TestBed } from '@angular/core/testing';

import { McAuthenticationGuard } from './mc-authentication.guard';

describe('McAuthenticationGuard', () => {
  let guard: McAuthenticationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(McAuthenticationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
