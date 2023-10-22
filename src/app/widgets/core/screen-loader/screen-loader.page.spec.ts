import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScreenLoaderPage } from './screen-loader.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MockModule, MockProvider } from 'ng-mocks';
import { TranslateModule } from '@ngx-translate/core';
import { StorageService } from 'src/app/services/storage/storage.service';

const mockStorageGetReturn = true;

describe('ScreenLoaderPage', () => {
  let component: ScreenLoaderPage;
  let fixture: ComponentFixture<ScreenLoaderPage>;

  beforeEach((async () => {
    await TestBed.configureTestingModule({
      declarations: [ScreenLoaderPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        MockModule(TranslateModule),
      ],
      providers: [
        MockProvider(StorageService, {
          get: () => Promise.resolve(JSON.stringify(mockStorageGetReturn))
        })
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(ScreenLoaderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('expect downloadFiles toHaveBeenCalled', () => {
    const spy = spyOn(component, 'downloadFiles').and.callThrough();
    component.downloadFiles();
    expect(spy).toHaveBeenCalled();
  });
});
