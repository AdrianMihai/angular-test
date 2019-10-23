import { Inject, Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
    @ViewChild('imageInput', {static: false}) imageInput: ElementRef<HTMLElement>;
    
    constructor(
        public dialogRef: MatDialogRef<ImageForm>,
        @Inject(MAT_DIALOG_DATA) public data: FormImageData,
    ) {
        this.imageForm = new FormGroup({
            imageTitle: new FormControl(this.data.title, Validators.required),
            imageDescription: new FormControl(this.data.description)
        });

    }

    ngOnInit(): void {
        this.imageForm.valueChanges.subscribe(val => {
            this.data.title = val.imageTitle;
            this.data.description = val.imageDescription;
        });
        
    } 

    isImageLoaded(): boolean {
        return this.data.url.length > 0;
    }

    isFormValid(): boolean {
        return !this.imageForm.invalid && this.isImageLoaded();
    }

    handleCloseClick(): void {
        this.dialogRef.close();
    }

    triggerFileInput(): void {
        const elem: HTMLElement = this.imageInput.nativeElement;

        elem.click();
    }

    removeImage(): void {
        this.data.url = "";
    }

    handleImageFileChange(event):void {
        const files = event.target.files;
        console.log(files);

        const fileReader = new FileReader();
        fileReader.onload = (e: any) => {
            this.isLoading = false;

            const imageUrl = e.target.result;
            this.data.url = imageUrl;
        };

        fileReader.readAsDataURL(files[0]);
        this.isLoading = true;
    }

    handleFormSubmit() {

        if (this.isFormValid()) {
            this.dialogRef.close(this.data);
        }
    }
    
}