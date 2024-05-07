import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CbNewAppointmentPage } from './cb-new-appointment.page';

describe('CbNewAppointmentPage', () => {
  let component: CbNewAppointmentPage;
  let fixture: ComponentFixture<CbNewAppointmentPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CbNewAppointmentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
