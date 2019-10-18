import { Inject, Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';

export interface FormImageData {
    title: string;
    description: string;
    url: any;
}

@Component({
    selector: 'image-form',
    templateUrl: './image-form.component.html',
    styleUrls: ['./image-form.component.scss']
})
export class ImageForm implements OnInit {
    isLoading: boolean = false;
    imageForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<ImageForm>,
        @Inject(MAT_DIALOG_DATA) public data: FormImageData,
    ) {
        this.imageForm = new FormGroup({
            imageTitle: new FormControl(this.data.title),
            imageDescription: new FormControl(this.data.description)
        });
    }

    ngOnInit(): void {
        this.imageForm.valueChanges.subscribe(val => {
            this.data.title = val.imageTitle;
            this.data.description = val.imageDescription;
        });
        
    }

    handleCloseClick(): void {
        this.dialogRef.close();
    }

    handleImageFileChange(event) {
        const files = event.target.files;
        console.log(files);

        const fileReader = new FileReader();
        fileReader.onload = (e) => {
            this.isLoading = false;

            const imageUrl = e.target.result;
            this.data.url = imageUrl;
        };

        fileReader.readAsDataURL(files[0]);
        this.isLoading = true;
    }
    
}