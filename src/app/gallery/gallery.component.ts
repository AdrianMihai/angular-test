import { Component } from "@angular/core";
import { ImageService } from './common/imageService';
import { MatDialog } from '@angular/material/dialog';
import { ImageForm, FormImageData } from './imageForm/image-form.component';
import { Image } from './common/image.model';
import { ImageCard } from './image-card/image-card.component';

@Component({
    selector: 'gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent {

    private dialogGeneralConfiguration: object;

    constructor(private readonly imageService: ImageService,
                public dialog: MatDialog,
        ) {

        this.dialogGeneralConfiguration = {
            panelClass: "gallery-dialog"
        }

        console.log(imageService);
    }

    ngDoCheck(): void {
        //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
        //Add 'implements DoCheck' to the class.
        console.log(this.imageService);
    }
    
    openImageForm(): void {
        let image: FormImageData = {description: "", url: "", title:""};

        const dialogRef = this.dialog.open(ImageForm, {
            id: 'imageFormDialog',
            data: image,
            ...this.dialogGeneralConfiguration
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.imageService.addImage(
                    new Image(result.title, result.description, result.url)
                );
            }
            
        });
    }

    imageClickHandler(index: number) {
        console.log(index);

        this.dialog.open(ImageCard, {
            data: this.imageService.getImage(index),
            ...this.dialogGeneralConfiguration
        });
    }
}