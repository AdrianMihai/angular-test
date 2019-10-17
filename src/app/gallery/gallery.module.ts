import { NgModule } from '@angular/core';
import { GalleryComponent } from './gallery.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { ImageService } from './common/imageService';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ImageForm } from './imageForm/image-form.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
    declarations: [GalleryComponent, ImageForm],
    imports: [ MatGridListModule, CommonModule, MatButtonModule, MatIconModule, MatDialogModule,
        MatFormFieldModule,  MatInputModule, FormsModule, ReactiveFormsModule ],
    entryComponents: [ ImageForm, GalleryComponent ],
    providers: [ImageService]
})
export class GalleryModule {

}