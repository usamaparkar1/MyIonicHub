import { TranslationService } from 'src/app/services/translation/translation.service';
import { SqliteStorageService } from './sqlite-storage.service';
import { Storage } from '@ionic/storage-angular';
import { TestBed } from '@angular/core/testing';
import { MockProvider } from 'ng-mocks';

const mockStorageKey: string = 'mockStorageKey';
const mockStorageValue: string = JSON.stringify({
  data: 'mockStorageValue'
});

describe('SqliteStorageService', () => {
  let service: SqliteStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockProvider(Storage),
        MockProvider(TranslationService)
      ]
    });
    service = TestBed.inject(SqliteStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
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
