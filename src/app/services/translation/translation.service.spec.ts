import { TranslationService } from './translation.service';
import { TranslateService } from '@ngx-translate/core';
import { TestBed } from '@angular/core/testing';
import { MockProvider } from 'ng-mocks';
import { localHelpers } from 'src/app/helpers/local-helpers';

const mockString: string = 'CORE.HELLO';

describe('TranslationService', () => {
  let service: TranslationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockProvider(TranslateService, {
          getDefaultLang: () => localHelpers.defaultLanguage
        })
      ]
    });
    service = TestBed.inject(TranslationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('expect getLanguageLocale to be english', () => {
    expect(service.getLanguageLocale()).toBe('en');
  });

  it('expect setupTranslations toHaveBeenCalled', () => {
    const spy = spyOn(service, 'setupTranslations').and.callThrough();
    service.setupTranslations();
    expect(spy).toHaveBeenCalled();
  });

  it('expect instant toHaveBeenCalled', () => {
    const spy = spyOn(service, 'instant').and.callThrough();
    service.instant(mockString);
    expect(spy).toHaveBeenCalled();
  });
});
