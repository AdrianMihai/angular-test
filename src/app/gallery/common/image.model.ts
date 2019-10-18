
export class Image {
    private id: number;
    private title: string;
    private description: string;
    private url: string;

    constructor(imgTitle: string, imgDescription: string, imgUrl: string) {
        this.title = imgTitle;
        this.description = imgDescription;
        this.url = imgUrl;
    }

    setId(imgId: number) {
        this.id = imgId;
    }
}