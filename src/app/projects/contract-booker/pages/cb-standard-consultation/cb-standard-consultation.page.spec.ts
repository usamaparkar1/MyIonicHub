import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CbStandardConsultationPage } from './cb-standard-consultation.page';

describe('CbStandardConsultationPage', () => {
  let component: CbStandardConsultationPage;
  let fixture: ComponentFixture<CbStandardConsultationPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CbStandardConsultationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
