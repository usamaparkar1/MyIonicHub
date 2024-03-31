import { ComponentFixture, TestBed } from '@angular/core/testing';
import { McHomePage } from './mc-home.page';

describe('McHomePage', () => {
  let component: McHomePage;
  let fixture: ComponentFixture<McHomePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(McHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
