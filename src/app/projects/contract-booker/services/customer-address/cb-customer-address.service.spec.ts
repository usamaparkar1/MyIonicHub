import { TestBed } from '@angular/core/testing';

import { CbCustomerAddressService } from './cb-customer-address.service';

describe('CbCustomerAddressService', () => {
  let service: CbCustomerAddressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CbCustomerAddressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
