import { TestBed } from '@angular/core/testing';

import { CbDbAppointmentsService } from './cb-db-appointments.service';

describe('CbDbAppointmentsService', () => {
  let service: CbDbAppointmentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CbDbAppointmentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
