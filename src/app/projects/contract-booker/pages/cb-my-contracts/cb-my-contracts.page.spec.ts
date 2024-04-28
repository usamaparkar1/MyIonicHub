import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CbMyContractsPage } from './cb-my-contracts.page';

describe('CbMyContractsPage', () => {
  let component: CbMyContractsPage;
  let fixture: ComponentFixture<CbMyContractsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CbMyContractsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
