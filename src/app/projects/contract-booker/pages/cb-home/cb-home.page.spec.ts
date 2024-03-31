import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CbHomePage } from './cb-home.page';

describe('CbHomePage', () => {
  let component: CbHomePage;
  let fixture: ComponentFixture<CbHomePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CbHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
