import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { IntroductionPage } from './introduction.page';
import { TranslateModule } from '@ngx-translate/core';
import { MockModule } from 'ng-mocks';
import { IonicModule } from '@ionic/angular';

describe('IntroductionPage', () => {
  let component: IntroductionPage;
  let fixture: ComponentFixture<IntroductionPage>;

  beforeEach((async () => {
    await TestBed.configureTestingModule({
      declarations: [IntroductionPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        MockModule(IonicModule),
        MockModule(TranslateModule),
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(IntroductionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
