import { Capacitor } from '@capacitor/core';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  	providedIn: 'root'
})

export class AppHelperService {

	hasSeenIntro$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	isAppSetup$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	isloggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    isCurrentAppInUse$: BehaviorSubject<string> = new BehaviorSubject<string>('');

    isNative(): boolean {
        return Capacitor.isNativePlatform();
    }

    isNotNullAndNotUndefined(valueToTest: any): boolean {
		return valueToTest !== null && valueToTest !== undefined;
	}

    isStringNotEmpty(stringToTest: string | undefined): boolean {
        return typeof stringToTest === 'string' && stringToTest.trim().length > 0;
    }

    isNumberInValid(numberToTest: any): boolean {
        return (isNaN(numberToTest) || !numberToTest);
    }

    /** @description Returns a string if its not empty or returns null */
    getStringOrNull(stringToTest: string): string | null {
        return (!stringToTest || stringToTest.length === 0) ? null : stringToTest;
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

    setCurrentAppInUseToken(currentAppHomeRoute: string) {
        this.isCurrentAppInUse$.next(currentAppHomeRoute);
    }

    removeCurrentAppInUseToken() {
        this.isCurrentAppInUse$.next('');
    }

    get getCurrentAppInUseToken() {
        return this.getStringOrNull(this.isCurrentAppInUse$.getValue());
    }
}
