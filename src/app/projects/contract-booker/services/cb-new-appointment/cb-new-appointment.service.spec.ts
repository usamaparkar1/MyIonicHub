import { TestBed } from '@angular/core/testing';

import { CbNewAppointmentService } from './cb-new-appointment.service';

describe('CbNewAppointmentService', () => {
  let service: CbNewAppointmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CbNewAppointmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
