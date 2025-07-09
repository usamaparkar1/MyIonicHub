import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CbSupportPage } from './cb-support.page';

describe('CbSupportPage', () => {
  let component: CbSupportPage;
  let fixture: ComponentFixture<CbSupportPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CbSupportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
