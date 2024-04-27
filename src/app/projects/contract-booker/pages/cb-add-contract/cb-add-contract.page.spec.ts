import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CbAddContractPage } from './cb-add-contract.page';

describe('CbAddContractPage', () => {
  let component: CbAddContractPage;
  let fixture: ComponentFixture<CbAddContractPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CbAddContractPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
