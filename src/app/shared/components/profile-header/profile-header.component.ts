import coreDataJson from 'src/assets/json-data/core-data.json';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ActionSheetService } from 'src/app/services/action-sheet/action-sheet.service';

@Component({
    standalone: true,
    imports: [
        CommonModule,
        IonicModule,
    ],
    selector: 'app-profile-header',
    templateUrl: './profile-header.component.html',
    styleUrls: ['./profile-header.component.scss'],
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
