import coreDataJson from 'src/assets/json-data/core-data.json';
import { Component, OnInit } from '@angular/core';

import { IonicModule } from '@ionic/angular';
import { ActionSheetService } from 'src/app/services/action-sheet/action-sheet.service';

@Component({
    imports: [
    IonicModule
],
    selector: 'app-profile-header',
    templateUrl: './profile-header.component.html',
    styleUrls: ['./profile-header.component.scss']
})

export class ProfileHeaderComponent  implements OnInit {
    
    coreData = coreDataJson;

    constructor(
        private _actionSheetService: ActionSheetService
    ) { }

    ngOnInit() {
    }

    async openProfileActionSheet() {
        const profileActionSheet = await this._actionSheetService.createProfileActionSheet();
        await profileActionSheet.present();
    }
}
