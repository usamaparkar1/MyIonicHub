import { SearchbarComponent } from 'src/app/widgets/shared/components/searchbar/searchbar.component';
import { modalHelpers } from 'src/app/helpers/modal-helpers';
import { ModalController } from '@ionic/angular';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CbModalService {

    constructor(
        private _modalController: ModalController
    ) { }

    async openStateSearchBarModal(searchList: any[]): Promise<HTMLIonModalElement> {
        return await new Promise(async (resolve) => {
            const stateSearchModal = await this._modalController.create({
                component: SearchbarComponent,
                id: modalHelpers.stateSearchBarModal.id,
                cssClass: modalHelpers.stateSearchBarModal.class,
                componentProps: {
                    searchList: searchList
                }
            });

            resolve(stateSearchModal);
        });
    }

    async openCitySearchBarModal(searchList: any[]): Promise<HTMLIonModalElement> {
        return await new Promise(async (resolve) => {
            const stateSearchModal = await this._modalController.create({
                component: SearchbarComponent,
                id: modalHelpers.citySearchBar.id,
                cssClass: modalHelpers.citySearchBar.class,
                componentProps: {
                    searchList: searchList
                }
            });

            resolve(stateSearchModal);
        });
    }
}
