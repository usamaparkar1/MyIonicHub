import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CbNewsPage } from './cb-news.page';

describe('CbNewsPage', () => {
  let component: CbNewsPage;
  let fixture: ComponentFixture<CbNewsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CbNewsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
