import { TranslationService } from 'src/app/services/translation/translation.service';
import { StorageService } from './storage.service';
import { Storage } from '@ionic/storage-angular';
import { TestBed } from '@angular/core/testing';
import { MockProvider } from 'ng-mocks';

const mockStorageKey: string = 'mockStorageKey';
const mockStorageValue: string = JSON.stringify({
  data: 'mockStorageValue'
});

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockProvider(Storage),
        MockProvider(TranslationService)
      ]
    });
    service = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('expect setupStorage toBeDefined', () => {
    const spy = spyOn(service, 'setupStorage').and.callThrough();
    service.setupStorage();
    expect(spy).toBeDefined();
  });

  it('expect get toBeDefined', () => {
    const spy = spyOn(service, 'get').withArgs(mockStorageKey).and.callThrough();
    service.get(mockStorageKey);
    expect(spy).toBeDefined();
  });
  
  it('expect set toBeDefined', () => {
    const spy = spyOn(service, 'set').withArgs(mockStorageKey, mockStorageValue).and.callThrough();
    service.set(mockStorageKey, mockStorageValue);
    expect(spy).toBeDefined();
  });
});
