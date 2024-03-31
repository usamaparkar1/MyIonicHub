import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouteNotFoundPage } from './route-not-found.page';

describe('RouteNotFoundPage', () => {
  let component: RouteNotFoundPage;
  let fixture: ComponentFixture<RouteNotFoundPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RouteNotFoundPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
