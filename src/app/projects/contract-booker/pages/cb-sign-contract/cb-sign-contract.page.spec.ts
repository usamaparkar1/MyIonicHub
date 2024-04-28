import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CbSignContractPage } from './cb-sign-contract.page';

describe('CbSignContractPage', () => {
  let component: CbSignContractPage;
  let fixture: ComponentFixture<CbSignContractPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CbSignContractPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
