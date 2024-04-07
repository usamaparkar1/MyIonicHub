import { Component, Input, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Sector } from '../../../pages/cb-product-selection/cb-product-selection.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonInput, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
    standalone: true,
    selector: 'cb-consumption-input',
    imports: [
        CommonModule,
        IonicModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    templateUrl: './cb-consumption-input.component.html',
    styleUrls: ['./cb-consumption-input.component.scss'],
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
        const value = ev.target.value;
        const filteredValue: string = value.replace(/[^0-9]+/g, ''); // Only allow numbers
        const newConsumption = parseInt(filteredValue);
        
        if (isNaN(newConsumption)) {
            this.ionConsumptionInputEl.value = this.consumptionPerYear = undefined;
            this.consumptionChangedEvent.emit(undefined);
        } else {
            if (newConsumption > this.sector.maxConsumption) {
                this.ionConsumptionInputEl.value = this.consumptionPerYear;
            } else {
                this.ionConsumptionInputEl.value = this.consumptionPerYear = newConsumption;
                this.consumptionChangedEvent.emit(this.consumptionPerYear);
            }
        }
    }

    consumptionChanged() {
        this.consumptionChangedEvent.emit(this.consumptionPerYear);
    }
}
