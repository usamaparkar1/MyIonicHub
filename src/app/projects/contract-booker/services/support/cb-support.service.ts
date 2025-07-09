import { CbSupportSuggestionsEnum } from '../../enums/cb-support-suggestions';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class CbSupportService {

    suggestions: BehaviorSubject<CbSupportSuggestionsEnum[]> = new BehaviorSubject<CbSupportSuggestionsEnum[]>([]);

    constructor() { }

    loadSuggestions(messages: CbSupportSuggestionsEnum[]): void {
        let newSuggestions: CbSupportSuggestionsEnum[] = [];

        if (messages.length === 0) {
            newSuggestions = this._getNewConversationSuggestions();
        }

        this.suggestions.next(newSuggestions);
    }

    private _getNewConversationSuggestions(): CbSupportSuggestionsEnum[] {
        return [
            CbSupportSuggestionsEnum.News,
            CbSupportSuggestionsEnum.Appointments,
            CbSupportSuggestionsEnum.MyContracts,
            CbSupportSuggestionsEnum.MyContracts,
        ];
    }
}