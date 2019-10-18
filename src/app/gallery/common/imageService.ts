import { Image } from './image.model';
import LocalStorageRepository from 'app/utilities/LocalStorageRepository';
import { Inject, Injectable } from '@angular/core';

@Injectable()
export class ImageService {
    private data: Array<Image> = [];
    private lsRepository: LocalStorageRepository = new LocalStorageRepository('images');

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