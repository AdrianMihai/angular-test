import { Image, ImageUserData } from './image.model';
import LocalStorageRepository from 'app/utilities/LocalStorageRepository';
import { Inject, Injectable } from '@angular/core';

@Injectable()
export class ImageService {
    private data: Array<Image> = [];
    private lsRepository: LocalStorageRepository = new LocalStorageRepository('images');

    constructor() {
        this.loadData();
    }

    private loadData() {
        const lsRepositoryData = this.lsRepository.getData();

        for (let idx in lsRepositoryData) {
            const imageData = lsRepositoryData[idx];
            const newImage: Image = new Image(
                imageData.title,
                imageData.description,
                imageData.url,
            );
            newImage.setId(this.getNextAvailableId());

            this.data.push(newImage);
        }

        console.log(lsRepositoryData);
    }

    public isEmpty(): boolean {
        return this.data.length === 0;
    }

    get images(): Array<Image> {
        return this.data;
    }

    getNextAvailableId() {
        return this.data.length + 1;
    }

    findImageIndexById(imgId: number): number {
        return this.data.findIndex(elem => elem.id == imgId);
    }

    addImage(image: Image): void {
        image.setId(this.getNextAvailableId());
        this.data.push(image);

        this.lsRepository.saveData(this.data);
    }

    deleteImage(imgId: number): void {
        const imgIndex = this.findImageIndexById(imgId);

        this.data.splice(imgIndex, 1);

        this.lsRepository.saveData(this.data);
    }

    updateImageData(imgId: number, imageData: ImageUserData) {
        const imageIndex: number = this.findImageIndexById(imgId);

        if (imageIndex === -1 ) {
            throw new Error('No image was found having the given id.');
        }

        if (imageData.title.length === 0 ) {
            throw new Error('The title of the image cannot be empty.');
        }

        console.log(this.data[imageIndex]);

        this.data[imageIndex].updateImageData(imageData);

        this.lsRepository.saveData(this.data);
    }

    getImage(index: number): Image {
        return this.data[index];
    }
}