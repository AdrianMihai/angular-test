import { Image, ImageUserData } from './image.model';

export default class ImageValidator {
    static isImageValid(image: Image): boolean {

        if (image.title.length === 0) {
            throw new Error('The title of the image cannot be empty.');
        }

        if (image.url.length === 0 ) {
            throw new Error("You haven't uploaded an image.");
        }
        
        return true;
    }

    static isImageDataValid(imageData: ImageUserData): boolean {
        if (imageData.title.length === 0) {
            throw new Error('The title of the image cannot be empty.');
        }
        
        return true;
    }
}