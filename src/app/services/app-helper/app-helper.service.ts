import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  	providedIn: 'root'
})

export class AppHelperService {

	hasSeenIntro$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	isAppSetup$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	isloggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

	isNotNullAndNotUndefined(valueToTest: any): boolean {
		return valueToTest !== null && valueToTest !== undefined;
	}

    setUserHasSeenIntroToken() {
        this.hasSeenIntro$.next(true);
    }

    removeUserHasSeenIntroToken() {
        this.hasSeenIntro$.next(true);
    }

    get userHasSeenIntro() {
        return this.hasSeenIntro$.getValue();
    }

    setIsAppSetupToken() {
        this.isAppSetup$.next(true);
    }

    removeIsAppSetupToken() {
        this.isAppSetup$.next(false);
    }

    get isAppSetup() {
        return this.isAppSetup$.getValue();
    }

    setUserIsLoggedInToken() {
        this.isloggedIn$.next(true);
    }

    removeUserIsLoggedInToken() {
        this.isloggedIn$.next(false);
    }

    get isUserLoggedIn() {
        return this.isloggedIn$.getValue();
    }
}
