import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CbPriceComparisonPage } from './cb-price-comparison.page';

describe('CbPriceComparisonPage', () => {
  let component: CbPriceComparisonPage;
  let fixture: ComponentFixture<CbPriceComparisonPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CbPriceComparisonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
