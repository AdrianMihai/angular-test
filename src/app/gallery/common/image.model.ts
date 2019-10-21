
export class Image {
    public id: number;
    public title: string;
    public description: string;
    public url: string;

    constructor(imgTitle: string, imgDescription: string, imgUrl: string) {
        this.title = imgTitle;
        this.description = imgDescription;
        this.url = imgUrl;
    }

    setId(imgId: number) {
        this.id = imgId;
    }
}