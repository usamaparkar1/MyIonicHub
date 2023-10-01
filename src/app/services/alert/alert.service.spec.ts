import { AlertController } from '@ionic/angular';
import { TestBed } from '@angular/core/testing';
import { AlertService } from './alert.service';
import { MockProvider } from 'ng-mocks';

const mockAlertId: string = 'mockAlertId';
const mockHeader: string = 'mockHeader';
const mockMessage: string = 'mockMessage';

describe('AlertService', () => {
  let service: AlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockProvider(AlertController, {
          create: () => Promise.resolve({
            present: () => Promise.resolve()
          }),
        }as any),
      ]
    });
    service = TestBed.inject(AlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('showAlert', () => {
    const spy = spyOn(service, 'showAlert').withArgs(mockAlertId, mockHeader, mockMessage).and.callThrough();
    service.showAlert( mockAlertId, mockHeader, mockMessage);
    expect(spy).toHaveBeenCalled();
  })
});
