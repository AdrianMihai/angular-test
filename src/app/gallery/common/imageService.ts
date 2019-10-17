import { Image } from './image.model';

export class ImageService {
    private data: Array<Image> = [];

    public isEmpty(): boolean {
        return this.data.length === 0;
    }

    get images(): Array<Image> {
        return this.data;
    }

    getNextAvailableId() {
        return this.data.length + 1;
    }

    addImage(image: Image): void {
        image.setId(this.getNextAvailableId());
        this.data.push(image);
    }
}