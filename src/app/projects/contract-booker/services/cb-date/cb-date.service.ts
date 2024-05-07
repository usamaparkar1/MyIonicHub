import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class CbDateService {

    cbDateFormat: string = "DD-MM-YYYY";

    constructor() { }

    getTodaysDateOnly(): string {
        return new Date().toISOString().split('T')[0];
    }

    getCurrentTime(): string {
        return new Date().toISOString();
    }
}
