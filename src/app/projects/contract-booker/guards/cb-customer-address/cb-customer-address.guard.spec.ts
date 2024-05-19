import { TestBed } from '@angular/core/testing';

import { CbCustomerAddressGuard } from './cb-customer-address.guard';

describe('CbCustomerAddressGuard', () => {
  let guard: CbCustomerAddressGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CbCustomerAddressGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
