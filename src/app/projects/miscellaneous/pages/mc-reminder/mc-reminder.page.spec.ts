import { ComponentFixture, TestBed } from '@angular/core/testing';
import { McReminderPage } from './mc-reminder.page';

describe('McReminderPage', () => {
  let component: McReminderPage;
  let fixture: ComponentFixture<McReminderPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(McReminderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
