import { NgModule } from '@angular/core';
import { GalleryComponent } from './gallery.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { ImageService } from './common/imageService';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ImageForm } from './imageForm/image-form.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingOverlay } from 'app/loading-overlay/loading-overlay.component';
import LocalStorageRepository from 'app/utilities/LocalStorageRepository';
import { ImageCard } from './image-card/image-card.component';
import {MatCardModule} from '@angular/material/card';

@NgModule({
    declarations: [GalleryComponent, ImageForm, LoadingOverlay, ImageCard],
    imports: [
        CommonModule, FormsModule, ReactiveFormsModule,
        MatGridListModule, MatButtonModule, MatIconModule, MatDialogModule, MatFormFieldModule, MatInputModule,
        MatProgressSpinnerModule, MatCardModule
    ],
    entryComponents: [ImageForm, GalleryComponent, LoadingOverlay, ImageCard],
    providers: [ImageService]
})
export class GalleryModule {

}