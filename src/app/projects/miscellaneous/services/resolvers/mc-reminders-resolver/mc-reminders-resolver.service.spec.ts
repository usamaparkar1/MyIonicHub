import { TestBed } from '@angular/core/testing';

import { McRemindersResolverService } from './mc-reminders-resolver.service';

describe('McRemindersResolverService', () => {
  let service: McRemindersResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(McRemindersResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
