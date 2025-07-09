import { CbSuggestionNews } from "./cb-suggestion-news";

export class CbSupportMessage implements ICbSupportMessage {
    text: string;
    from: CbSupportMessageSender;
    type: CbSupportMessageType;
    news?: CbSuggestionNews[];
    newsIssue?: CbNewsIssue[]
    
    constructor(cbSupportMessages: CbSupportMessage) {
        this.text = cbSupportMessages.text;
        this.from = cbSupportMessages.from;
        this.news = cbSupportMessages.news;
        this.newsIssue = cbSupportMessages.newsIssue;
        this.type = cbSupportMessages.type;
    }
}

interface ICbSupportMessage {
    text: string;
    from: CbSupportMessageSender;
    type: CbSupportMessageType;
    news?: CbSuggestionNews[];
    newsIssue?: CbNewsIssue[];
}

export class CbNewsIssue implements ICbNewsIssue {
    id: number;
    message: string;

    constructor(cbNewsIssue: CbNewsIssue) {
        this.id = cbNewsIssue.id;
        this.message = cbNewsIssue.message;
    }
}

export enum CbSupportMessageSender {
    Bot = "bot",
    User = "user"
}

interface ICbNewsIssue {
    id: number;
    message: string;
}

export enum CbSupportMessageType {
    Input = "input",
    Suggestion = "suggestion",
    News = "news",
    NewsIssue = "news-issue",
    DefaultBotResponse = "default-bot-response"
}