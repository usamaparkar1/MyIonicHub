import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class McHelperService {

    constructor() { }

    getHoursInMiliseconds(hours: number): number {
        return hours * 1 * 60 * 60 * 1000;
    }

    getOneDayFromNowInMiliseconds(): number {
        const currentTime = new Date();
        const oneDayInMilliseconds = 24 * 60 * 60 * 1000; // 24 hours * 60 minutes * 60 seconds * 1000 milliseconds
        return currentTime.getTime() + oneDayInMilliseconds;
    }
}
