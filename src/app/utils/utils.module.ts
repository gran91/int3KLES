
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// CONFIRM
import { ConfirmDialogComponent } from './confirmation/confirm-dialog.component';

// LOADING
import { LoadingComponent } from './loading/loading.component';

// PIPE
import { AddressPipe, CapitalizePipe, ListFilterPipe } from './pipe/index';

// SERVICE
import { CookieService, WindowService, CRUDService } from './service/index';

@NgModule({
    imports: [CommonModule],
    declarations: [
        AddressPipe,
        ListFilterPipe,
        CapitalizePipe,
        LoadingComponent,
        ConfirmDialogComponent
    ],
    exports: [
        AddressPipe,
        ListFilterPipe,
        CapitalizePipe,
        LoadingComponent
    ]
})
export class UtilsModule { }
