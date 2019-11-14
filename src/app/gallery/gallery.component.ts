import { Component, ChangeDetectorRef } from "@angular/core";
import { ImageService } from './common/imageService';
import { MatDialog } from '@angular/material/dialog';
import { ImageForm, FormImageData } from './imageForm/image-form.component';
import { Image } from './common/image.model';
import { ImageCard } from './image-card/image-card.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent {

    private dialogGeneralConfiguration: object;

    constructor(
        private readonly imageService: ImageService,
        public dialog: MatDialog,
        private _snackBar: MatSnackBar,
        private changeDetector: ChangeDetectorRef
    ) {

        this.dialogGeneralConfiguration = {
            panelClass: "gallery-dialog"
        }

        console.log(imageService);
    }

    ngDoCheck(): void {
    }

    openImageForm(): void {
        let image: FormImageData = { description: "", url: "", title: "" };

        const dialogRef = this.dialog.open(ImageForm, {
            id: 'imageFormDialog',
            data: image,
            ...this.dialogGeneralConfiguration
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                try {
                    this.imageService.addImage(new Image(result.title, result.description, result.url));
                }
                catch (e) {
                    this._snackBar.open(e.message,
                        '',
                        {
                            panelClass: ['custom-snackbar', 'snackbar-error'],
                            duration: 7000

                        }
                    );
                }
            }

        });
    }

    imageClickHandler(index: number) {
        console.log(index);

        const dialogRef = this.dialog.open(ImageCard, {
            data: this.imageService.getImage(index),
            ...this.dialogGeneralConfiguration
        });

        dialogRef.afterClosed().subscribe(image => {

            if (image) {
                const snackBarRef = this._snackBar.open('Image successfully deleted.', 'Undo',
                    {
                        panelClass: ['custom-snackbar', 'snackbar-success'],
                        duration: 10000
                    }
                );

                snackBarRef.afterDismissed().subscribe((result) => {

                    if (result.dismissedByAction) {

                        const img: Image = new Image(image.title, image.description, image.url);

                        try {
                            this.imageService.addImage(img);
                            this.changeDetector.detectChanges();
                        }
                        catch (e) {
                            this._snackBar.open(e.message,
                                '',
                                {
                                    panelClass: ['custom-snackbar', 'snackbar-error'],
                                    duration: 7000

                                }
                            );
                        }

                    }
                });
            }
        });
    }
}