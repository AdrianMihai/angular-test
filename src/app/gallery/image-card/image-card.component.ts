import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Image } from '../common/image.model';
import { ImageService } from '../common/imageService';


@Component({
    selector: 'image-card',
    templateUrl: './image-card.component.html',
    styleUrls: ['./image-card.component.scss']
})
export class ImageCard {
    constructor(
        public dialogRef: MatDialogRef<ImageCard>,
        @Inject(MAT_DIALOG_DATA) public data: Image,
        private readonly imageService: ImageService
    ) {
        
    }

    handleDeleteClick(imgId: number) {
        this.imageService.deleteImage(imgId);
        this.dialogRef.close();
    }

    handleCloseClick() {
        this.dialogRef.close();
    }
}