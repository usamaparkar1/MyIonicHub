import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CbAppointmentsPage } from './cb-appointments.page';

describe('CbAppointmentsPage', () => {
  let component: CbAppointmentsPage;
  let fixture: ComponentFixture<CbAppointmentsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CbAppointmentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
