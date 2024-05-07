import { TestBed } from '@angular/core/testing';

import { CbDateService } from './cb-date.service';

describe('CbDateService', () => {
  let service: CbDateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CbDateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
