import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CbCustomerAddressPage } from './cb-customer-address.page';

describe('CbCustomerAddressPage', () => {
  let component: CbCustomerAddressPage;
  let fixture: ComponentFixture<CbCustomerAddressPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CbCustomerAddressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
