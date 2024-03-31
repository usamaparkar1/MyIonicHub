import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CbProductSelectionPage } from './cb-product-selection.page';

describe('CbProductSelectionPage', () => {
  let component: CbProductSelectionPage;
  let fixture: ComponentFixture<CbProductSelectionPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CbProductSelectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
