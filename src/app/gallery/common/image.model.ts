export class Image {
    private id: number;
    private url: string;

    constructor(imgUrl: string) {
        this.url = imgUrl;
    }

    setId(imgId: number) {
        this.id = imgId;
    }
}