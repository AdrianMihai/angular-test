import { Component, Input } from '@angular/core';

@Component({
    selector: 'loading-overlay',
    templateUrl: './loading-overlay.component.html',
    styleUrls: ['./loading-overlay.component.scss']
})
export class LoadingOverlay {
    @Input()
    spinnerColor: string = "primary";
}
