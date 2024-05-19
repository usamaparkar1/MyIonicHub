export class SlidesModel implements ISlidesModel {
    title: string;
    imageUrl: string;
  
    constructor(slidesModel: SlidesModel) {
        this.title = slidesModel.title;
        this.imageUrl = slidesModel.imageUrl;
    }
}
  
export interface ISlidesModel {
    title: string;
    imageUrl: string;
}