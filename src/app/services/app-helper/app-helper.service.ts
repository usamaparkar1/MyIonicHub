import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  	providedIn: 'root'
})

export class AppHelperService {

	isAppSetup$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	hasSeenIntro$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


	isNotNullAndNotUndefined(valueToTest: any): boolean {
		return valueToTest !== null && valueToTest !== undefined;
	}
}
