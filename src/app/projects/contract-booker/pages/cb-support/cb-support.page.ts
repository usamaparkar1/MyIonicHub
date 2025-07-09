import { CbNewsIssue, CbSupportMessage, CbSupportMessageSender, CbSupportMessageType } from '../../models/cb-support-messages';
import { CbSupportNewsService } from '../../services/support-news/cb-support-news.service';
import { CbSupportSuggestionsEnum } from '../../enums/cb-support-suggestions';
import { CbSupportService } from '../../services/support/cb-support.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CbSuggestionNews } from '../../models/cb-suggestion-news';
import { IonContent } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-cb-support',
    templateUrl: './cb-support.page.html',
    styleUrls: ['./cb-support.page.scss'],
})

export class CbSupportPage implements OnInit, OnDestroy {

    @ViewChild(IonContent, { static: false }) content!: IonContent;

    private _suggestionsSubscription!: Subscription;

    newMessage: string = '';
    messages: CbSupportMessage[] = [];
    suggestions: CbSupportSuggestionsEnum[] = [];

    constructor(
        private _cbSupportService: CbSupportService,
        private _cbSupportNewsService: CbSupportNewsService
    ) { }

    ngOnInit() {
        this._supportInit();
    }

    ngOnDestroy(): void {
        this._removeSubscriptions();
    }

    private _removeSubscriptions() {
        this._suggestionsSubscription.unsubscribe();
    }

    private _supportInit(): void {
        this._subscribeToSuggestions();
    }

    private _subscribeToSuggestions() {
        this._suggestionsSubscription = this._cbSupportService.suggestions.subscribe((nextSuggestions) => {
            this.suggestions = nextSuggestions;
        });
    }

    private _scrollToBottom() {
        setTimeout(() => {
            this.content.scrollToBottom();
        }, 300);
    }

    /** @description Message event triggered from front end */
    sendClicked() {
        // Do nothing for an empty message.
        if (this.newMessage.trim() === '') return;
    
        this._sendUserMessage({
            text: this.newMessage,
            from: CbSupportMessageSender.User,
            type: CbSupportMessageType.Input
        });
        this._createDefaultBotMessage();
    }
    
    /** @description Push the User message to the queue */
    private _sendUserMessage(cbSupportMessage: CbSupportMessage) {
        this.messages.push(cbSupportMessage);
        this.newMessage = ''; 
        this._scrollToBottom();
    }

    /** @description When there is no simulated response, reply with a default message */
    private _createDefaultBotMessage() {
        const newBotMessage: CbSupportMessage = new CbSupportMessage({
            text: 'Please write an email so that we can get back to you',
            from: CbSupportMessageSender.Bot,
            type: CbSupportMessageType.DefaultBotResponse
        });

        this._sendBotReply(newBotMessage);
    }

    /** @description Handle module suggestions clicked event. */
    selectSuggestion(suggestion: CbSupportSuggestionsEnum) {
        this._sendUserMessage({
            text: suggestion,
            from: CbSupportMessageSender.User,
            type: CbSupportMessageType.Suggestion
        });

        switch (suggestion) {
            case CbSupportSuggestionsEnum.News:
                this._handleNewsSuggestion();
                break;
            case CbSupportSuggestionsEnum.Appointments:
                // Handle Suggestion for Appointments
                break;
            case CbSupportSuggestionsEnum.MyContracts:
                // Handle Suggestion for MyContracts
                break;
            case CbSupportSuggestionsEnum.Consultation:
                // Handle Suggestion for Consultation
                break;
            default:
                this._createDefaultBotMessage();
                break;
        }
    }

    /** @description Just a small time simulation before sending a message */
    private _sendBotReply(newBotMessage: CbSupportMessage) {
        // Simulate bot response
        setTimeout(() => {
            this.messages.push(newBotMessage);
            this._scrollToBottom();
        }, 1000);
    }

    /** @description Send the appropriate news as a message response for the user to select */
    private _handleNewsSuggestion() {
        const newBotMessage: CbSupportMessage = new CbSupportMessage({
            text: 'Please tell us more about the news that you are concerned with',
            from: CbSupportMessageSender.Bot,
            news: this._cbSupportNewsService.getNewsSuggestionsReponse(),
            type: CbSupportMessageType.News
        });

        this._sendBotReply(newBotMessage);
    }

    newsClicked(suggestionNews: CbSuggestionNews) {
        this.messages.push({ text: suggestionNews.title, from: CbSupportMessageSender.User, type: CbSupportMessageType.Input });
        this._scrollToBottom();

        const newBotMessage: CbSupportMessage = new CbSupportMessage({
            text: 'Please tell us more about the issue that you encounter',
            from: CbSupportMessageSender.Bot,
            newsIssue: this._cbSupportNewsService.getNewsIssueResponse(),
            type: CbSupportMessageType.NewsIssue
        });

        this._sendBotReply(newBotMessage);
    }

    newsIssueClicked(issue: CbNewsIssue) {
        this.messages.push({ text: issue.message, from: CbSupportMessageSender.User, type: CbSupportMessageType.Input });
        this._scrollToBottom();

        this._sendBotReply(new CbSupportMessage({
            text: 'Please give us more details in order to better understand your concern',
            from: CbSupportMessageSender.Bot,
            type: CbSupportMessageType.DefaultBotResponse
        }));
    }
}