import { Component, Inject, ViewChild, ElementRef } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Image, ImageUserData } from '../common/image.model';
import { ImageService } from '../common/imageService';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
    selector: 'image-card',
    templateUrl: './image-card.component.html',
    styleUrls: ['./image-card.component.scss']
})
export class ImageCard {
    private isUpdateModeOn: boolean = false;
    private imageTitle: FormControl;
    private imageDescription: FormControl;

    @ViewChild('titleInput', { static: false }) titleInput: ElementRef<HTMLElement>;

    constructor(
        public dialogRef: MatDialogRef<ImageCard>,
        private _snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public data: Image,
        private readonly imageService: ImageService
    ) {
        this.imageTitle = new FormControl(data.title, Validators.required);
        this.imageDescription = new FormControl(data.description);
    }

    getDescriptionText() {
        return this.data.description ? this.data.description : "No description was specified."
    }

    handleDeleteClick(imgId: number) {
        const deletedImage: Image = this.imageService.deleteImage(imgId);

        // const snackBarRef = this._snackBar.open('Image successfully deleted.', 'Undo',
        //     {
        //         panelClass: ['custom-snackbar', 'snackbar-success'],
        //         duration: 10000
        //     }
        // );

        // snackBarRef.afterDismissed().subscribe((result) => {

        //     if (result.dismissedByAction) {

        //         const img: Image = new Image(deletedImage.title, deletedImage.description, deletedImage.url);
        //         console.log(img);
        //         this.imageService.addImage(img);

        //     }
        // });

        this.dialogRef.close(deletedImage);
    }

    saveImageDataChanges() {
        const imageData: ImageUserData = {
            title: this.imageTitle.value,
            description: this.imageDescription.value
        };

        try {
            this.imageService.updateImageData(this.data.id, imageData);
            this._snackBar.dismiss();
            this.toggleUpdateMode();
        } catch (e) {
            this._snackBar.open(e.message, '',
                {
                    panelClass: ['custom-snackbar', 'snackbar-error'],
                    duration: 7000
                }
            );
        }

    }

    handleCloseClick() {
        this.dialogRef.close();
    }

    toggleUpdateMode() {
        this.isUpdateModeOn = !this.isUpdateModeOn;

        setTimeout(() => {
            if (this.isUpdateModeOn) {
                this.titleInput.nativeElement.focus();
            }
        }, 0);
    }


}