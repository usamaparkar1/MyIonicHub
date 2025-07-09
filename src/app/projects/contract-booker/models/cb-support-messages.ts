import { CbSuggestionNews } from "./cb-suggestion-news";

export class CbSupportMessage implements ICbSupportMessage {
    text: string;
    from: "bot" | "user";
    news?: CbSuggestionNews[];
    
    constructor(cbSupportMessages: CbSupportMessage) {
        this.text = cbSupportMessages.text;
        this.from = cbSupportMessages.from;
        this.news = cbSupportMessages.news;
    }
}

interface ICbSupportMessage {
    text: string;
    from: "bot" | "user";
    news?: CbSuggestionNews[];
}