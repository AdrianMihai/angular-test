import { Component, Inject, ViewChild, ElementRef, SimpleChanges, OnChanges } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Image, ImageUserData } from '../common/image.model';
import { ImageService } from '../common/imageService';
import { FormControl, Validators } from '@angular/forms';


@Component({
    selector: 'image-card',
    templateUrl: './image-card.component.html',
    styleUrls: ['./image-card.component.scss']
})
export class ImageCard {
    private isUpdateModeOn: boolean = false;
    private imageTitle: FormControl;
    private imageDescription: FormControl;

    @ViewChild('titleInput', {static: false}) titleInput: ElementRef<HTMLElement>;

    constructor(
        public dialogRef: MatDialogRef<ImageCard>,
        @Inject(MAT_DIALOG_DATA) public data: Image,
        private readonly imageService: ImageService
    ) {
        this.imageTitle = new FormControl(data.title, Validators.required);
        this.imageDescription = new FormControl(data.description);
    }

    ngDoCheck(): void {

        // if (this.titleInput) {
        //     this.titleInput.nativeElement.focus();
        // };
        
    }

    getDescriptionText() {
        return this.data.description ? this.data.description : "No description was specified." 
    }

    handleDeleteClick(imgId: number) {
        this.imageService.deleteImage(imgId);
        this.dialogRef.close();
    }

    saveImageDataChanges() {
        const imageData: ImageUserData = {
            title: this.imageTitle.value,
            description: this.imageDescription.value
        };

        try {
            this.imageService.updateImageData(this.data.id, imageData);
            this.toggleUpdateMode();
        } catch (e) {
            console.log(e);
        }
        
    }

    handleCloseClick() {
        this.dialogRef.close();
    }

    toggleUpdateMode() {
        this.isUpdateModeOn = !this.isUpdateModeOn;
    }


}