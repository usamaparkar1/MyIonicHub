import { TestBed } from '@angular/core/testing';

import { McReminderService } from './mc-reminder.service';

describe('McReminderService', () => {
  let service: McReminderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(McReminderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
