import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CbProductDetailsPage } from './cb-product-details.page';

describe('CbProductDetailsPage', () => {
  let component: CbProductDetailsPage;
  let fixture: ComponentFixture<CbProductDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CbProductDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
