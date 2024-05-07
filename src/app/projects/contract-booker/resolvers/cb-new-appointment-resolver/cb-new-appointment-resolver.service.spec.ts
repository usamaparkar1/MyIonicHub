import { TestBed } from '@angular/core/testing';

import { CbNewAppointmentResolverService } from './cb-new-appointment-resolver.service';

describe('CbNewAppointmentResolverService', () => {
  let service: CbNewAppointmentResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CbNewAppointmentResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
