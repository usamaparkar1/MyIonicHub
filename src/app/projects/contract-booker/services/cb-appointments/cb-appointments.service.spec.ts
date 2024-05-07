import { TestBed } from '@angular/core/testing';

import { CbAppointmentsService } from './cb-appointments.service';

describe('CbAppointmentsService', () => {
  let service: CbAppointmentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CbAppointmentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
