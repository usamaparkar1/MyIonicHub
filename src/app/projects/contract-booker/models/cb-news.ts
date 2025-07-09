export class CbNews implements INews {
    id: number;
    title: string;
    description: string;
    isRead: boolean;
    expanded: boolean;
    createDate: string;

    constructor(cbNews: CbNews) {
        this.id = cbNews.id;
        this.title = cbNews.title;
        this.description = cbNews.description;
        this.isRead = cbNews.isRead;
        this.expanded = cbNews.expanded;
        this.createDate = cbNews.createDate
    }
}

export interface INews {
    id: number;
    title: string;
    description: string;
    isRead: boolean;
    expanded: boolean;
    createDate: string;
}