import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CbShoppingCartPage } from './cb-shopping-cart.page';

describe('CbShoppingCartPage', () => {
  let component: CbShoppingCartPage;
  let fixture: ComponentFixture<CbShoppingCartPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CbShoppingCartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
