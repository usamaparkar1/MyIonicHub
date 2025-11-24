import { Component, Input, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonInput, IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { Sector } from '../../../models/cb-sector';


@Component({
    selector: 'cb-consumption-input',
    imports: [
    IonicModule,
    FormsModule,
    TranslateModule,
    ReactiveFormsModule
],
    templateUrl: './cb-consumption-input.component.html',
    styleUrls: ['./cb-consumption-input.component.scss']
})

export class CbConsumptionInputComponent  implements OnInit {

    @ViewChild('ionConsumptionInputEl', { static: true }) ionConsumptionInputEl!: IonInput;
    @Output() consumptionChangedEvent: EventEmitter<any> = new EventEmitter();
    @Input() consumptionPerYearLabel!: string;
    @Input() consumptionPerYear: number | undefined;
    @Input() sector!: Sector;

    constructor() {
    }

    ngOnInit() {
    }

    onConsumptionInput(ev: any) {
        const value = ev.detail.value;
        if (ev.detail?.event?.data && this.containsNonNumericOrSpecial(ev.detail?.event?.data)) {
            this.ionConsumptionInputEl.value = this.consumptionPerYear;
            return;
        }
        
        const newConsumption: number = parseInt(value.replace(/[^0-9]+/g, ''));
        if (newConsumption > this.sector.maxConsumption) {
            this.ionConsumptionInputEl.value = this.consumptionPerYear;
        } else {
            this.ionConsumptionInputEl.value = this.consumptionPerYear = newConsumption;
            this.consumptionChangedEvent.emit(this.consumptionPerYear);
        }
    }

    containsNonNumericOrSpecial(str: string): boolean {
        return /\D/.test(str);
    }

    consumptionChanged(event: any) {
        this.consumptionPerYear = event.detail?.value;
        this.consumptionChangedEvent.emit(this.consumptionPerYear);
    }
}
