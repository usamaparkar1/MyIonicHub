import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { Storage } from '@ionic/storage-angular';
import { MockProvider } from 'ng-mocks';
import { TranslationService } from './services/translation/translation.service';
import { SqliteStorageService } from './services/storage/sqlite-storage.service';

describe('AppComponent', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        MockProvider(SqliteStorageService),
        MockProvider(TranslationService)
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
