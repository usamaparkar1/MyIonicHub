import { TestBed } from '@angular/core/testing';

import { CbAppointmentsResolverService } from './cb-appointments-resolver.service';

describe('CbAppointmentsResolverService', () => {
  let service: CbAppointmentsResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CbAppointmentsResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
