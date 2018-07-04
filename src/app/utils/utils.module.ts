
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Toaster
import { ToasterModule, ToasterService } from 'angular2-toaster/angular2-toaster';

// MODAL
import { ModalModule } from 'ngx-bootstrap/modal';

// TRANSLATE
import { TranslateModule } from '@ngx-translate/core';

// CONFIRM
import { ConfirmDialogComponent } from './confirmation/confirm-dialog.component';


// Order Module
import { Ng2OrderModule } from 'ng2-order-pipe';

// COMPONENT
import { SimpleTableListComponent } from './components/simpletablelist.component';
import { SimpleDetailComponent } from './components/simpledetail.component';
import { DetailFormComponent } from './components/detail.form.component';
import { ItemFormComponent } from './components/item.form.component';
import { ListComponent } from './components/list.component';
import { ValidationButtonComponent } from './components/validation.button';

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
        ToasterModule,
        NgxPaginationModule,
        Ng2OrderModule,
        ModalModule.forRoot()
    ],
    declarations: [
        AddressPipe,
        ListFilterPipe,
        CapitalizePipe,
        LoadingComponent,
        ConfirmDialogComponent,
        SimpleTableListComponent,
        SimpleDetailComponent,
        NavPaginationComponent,
        ItemFormComponent,
        DetailFormComponent,
        ListComponent,
        ValidationButtonComponent
    ],
    exports: [
        AddressPipe,
        ListFilterPipe,
        CapitalizePipe,
        LoadingComponent,
        ConfirmDialogComponent,
        SimpleTableListComponent,
        SimpleDetailComponent,
        NavPaginationComponent,
        ItemFormComponent,
        DetailFormComponent,
        ListComponent,
        ValidationButtonComponent

    ],
    entryComponents: [
        ConfirmDialogComponent,
        SimpleTableListComponent,
        NavPaginationComponent,
        ItemFormComponent,
        DetailFormComponent,
        ListComponent,
        ValidationButtonComponent
    ]
})
export class UtilsModule { }
