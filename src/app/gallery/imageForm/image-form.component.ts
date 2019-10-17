import { Inject, Component } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';

export interface FormImageData {
    description: string;
}

@Component({
    selector: 'image-form',
    templateUrl: './image-form.component.html',
    styleUrls: ['./image-form.component.scss']
})
export class ImageForm {
    imageTitleControl = new FormControl('');
    imageDescriptionControl = new FormControl('');

    constructor(
        public dialogRef: MatDialogRef<ImageForm>,
        @Inject(MAT_DIALOG_DATA) public data: FormImageData
    ) {

        this.data.description = 'whatever';
    }

    handleCloseClick(): void {
        this.dialogRef.close();
    }
    
}