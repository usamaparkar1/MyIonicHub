import { TestBed } from '@angular/core/testing';

import { CbShoppingCartGuard } from './cb-shopping-cart.guard';

describe('CbShoppingCartGuard', () => {
  let guard: CbShoppingCartGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CbShoppingCartGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
