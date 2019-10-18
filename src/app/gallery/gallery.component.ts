import { Component } from "@angular/core";
import { ImageService } from './common/imageService';
import { MatDialog } from '@angular/material/dialog';
import { ImageForm, FormImageData } from './imageForm/image-form.component';
import { Image } from './common/image.model';

@Component({
    selector: 'gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent {
    constructor(private readonly imageService: ImageService,
                public imageForm: MatDialog) {
        console.log(imageService);
    }

    openImageForm(): void {
        let image: FormImageData = {description: "", url: "", title:""};

        const dialogRef = this.imageForm.open(ImageForm, {
            id: 'imageFormDialog',
            data: image,
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
            this.imageService.addImage(
                new Image(result.title, result.description, result.url)
            );
        });
    }
}