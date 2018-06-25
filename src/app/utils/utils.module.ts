
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// TRANSLATE
import { TranslateModule } from '@ngx-translate/core';

// CONFIRM
import { ConfirmDialogComponent } from './confirmation/confirm-dialog.component';

// COMPONENT
import { SimpleTableListComponent } from './components/simpletablelist.component';
import { SimpleDetailComponent } from './components/simpledetail.component';

// PAGINATION NAV
import { NgxPaginationModule } from 'ngx-pagination';
import { NavPaginationComponent } from './components/nav.pagination.component';

// LOADING
import { LoadingComponent } from './loading/loading.component';

// PIPE
import { AddressPipe, CapitalizePipe, ListFilterPipe } from './pipe/index';

// SERVICE
import { CookieService, WindowService, CRUDService } from './service/index';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        NgxPaginationModule
    ],
    declarations: [
        AddressPipe,
        ListFilterPipe,
        CapitalizePipe,
        LoadingComponent,
        ConfirmDialogComponent,
        SimpleTableListComponent,
        SimpleDetailComponent,
        NavPaginationComponent
    ],
    exports: [
        AddressPipe,
        ListFilterPipe,
        CapitalizePipe,
        LoadingComponent,
        ConfirmDialogComponent,
        SimpleTableListComponent,
        SimpleDetailComponent,
        NavPaginationComponent
    ],
    entryComponents: [
        ConfirmDialogComponent,
        SimpleTableListComponent,
        NavPaginationComponent
    ]
})
export class UtilsModule { }
