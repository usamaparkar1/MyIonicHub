import { PasswordHelperService } from './password-helper.service';
import { TestBed } from '@angular/core/testing';

describe('PasswordHelperService', () => {
    let service: PasswordHelperService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(PasswordHelperService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
