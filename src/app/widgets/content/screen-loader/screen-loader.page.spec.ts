import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScreenLoaderPage } from './screen-loader.page';

describe('ScreenLoaderPage', () => {
  let component: ScreenLoaderPage;
  let fixture: ComponentFixture<ScreenLoaderPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ScreenLoaderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
