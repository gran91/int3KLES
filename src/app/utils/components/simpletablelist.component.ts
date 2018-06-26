import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Input, Output, NgModule } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster';
import { TranslateService } from '@ngx-translate/core';
import { PaginationInstance } from 'ngx-pagination';
import { Observable } from 'rxjs/Observable';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmDialogComponent } from '../confirmation/confirm-dialog.component';
import { CRUDService } from '../service/CRUD.service';
import { AngularFirestoreDocument } from 'angularfire2/firestore';

@Component({
    selector: 'app-simpletable-list',
    template: '<div>SimpleTableList</div>',
    styleUrls: ['../../../scss/vendors/toastr/toastr.scss'],
    changeDetection: ChangeDetectionStrategy.Default
})
export class SimpleTableListComponent implements OnInit {
    @Input() selectedRow = {};
    setClickedRow: Function;
    @Output() onSelectedRow = new EventEmitter();
    @Output() onEdit = new EventEmitter();
    @Output() onDelete = new EventEmitter();

    // FIREBASE
    itemDoc: AngularFirestoreDocument<any>;
    items = [];
    item = {};

    // FILTER
    filter = {};

    // Sorting
    key = 'name';
    reverse = false;

    isLoading = false;
    isEditing = false;

    // INPUT FILTER
    filterCode = '';
    filterName = '';

    // FILTER
    isCollapsed = true;

    // PAGINATION
    public maxSize = 7;
    public directionLinks = true;
    public autoHide = false;
    public config: PaginationInstance = {
        id: 'advanced',
        itemsPerPage: 5,
        currentPage: 1
    };
    public paginationLabel: any = {
        previousLabel: 'Previous',
        nextLabel: 'Next',
        screenReaderPaginationLabel: 'Pagination',
        screenReaderPageLabel: 'page',
        screenReaderCurrentLabel: `label`
    };

    public toasterconfig: ToasterConfig = new ToasterConfig({
        tapToDismiss: true,
        timeout: 5000
    });

    constructor(public mainService: CRUDService,
        public toasterService: ToasterService,
        public translate: TranslateService,
        public _bsModalService: BsModalService
    ) {
        this.setClickedRow = function (index) {
            this.selectedRow = index;
            this.onSelectedRow.emit(this.selectedRow);
        }
    }

    ngOnInit() {
        this.translatePaginationControl();
        this.mainService.list().subscribe(datas => {
            this.items = datas;
        });
    }

    // CRUD
    list() {
        this.mainService.list().subscribe(
            data => {
                this.items = data;
                this.isLoading = false;
            },
            error => console.log(error),
            () => this.isLoading = false
        );
    }

    add(item) {
        this.mainService.add(item);
        this.toasterService.pop('success', this.translate.instant('main.add'), this.translate.instant('message.add.success'));
    }

    edit(item) {
        this.onEdit.emit(true);
        // this.mainService.update(item);
        // this.toasterService.pop('success', this.translate.instant('main.update'), this.translate.instant('message.update.success'));
    }

    delete(item) {
        const modal = this._bsModalService.show(ConfirmDialogComponent);
        (<ConfirmDialogComponent>modal.content).showConfirmationModal(
            this.translate.instant('main.delete'),
            this.translate.instant('message.delete.confirm')
        );

        (<ConfirmDialogComponent>modal.content).onClose.subscribe(result => {
            if (result === true) {
                this.mainService.delete(item);
                this.toasterService.pop('success', this.translate.instant('main.delete'), this.translate.instant('message.delete.success'));
                this.onDelete.emit(true);
            } else if (result === false) {
                this.toasterService.pop('warning', this.translate.instant('main.delete'), this.translate.instant('message.delete.cancel'));
                this.onDelete.emit(false);
                // this.onDelete.emit('cancel');
            } else {
                this.onDelete.emit(false);
                // When closing the modal without no or yes
            }
        });
    }

    enableEditing(item) {
        this.isEditing = true;
        this.item = item;
    }

    cancelEditing() {
        this.isEditing = false;
        this.item = {};
        this.toasterService.pop('warning', 'Cancel', 'item editing cancelled.');
    }

    // PAGINATION
    translatePaginationControl() {
        this.translate.get(this.paginationLabel.previousLabel).subscribe((res: String) => {
            this.paginationLabel.previousLabel = res;
        });
        this.translate.get(this.paginationLabel.nextLabel).subscribe((res: String) => {
            this.paginationLabel.nextLabel = res;
        });
    }

    // SORTING
    sort(key) {
        this.key = key;
        this.reverse = !this.reverse;
    }

    // SELECT
    unselect() {
        this.selectedRow = {};
        this.onSelectedRow.emit(this.selectedRow);
    }

    // FILTER BLOCK
    collapsed(event: any): void {
        console.log(event);
    }

    expanded(event: any): void {
        console.log(event);
    }

    // PAGINATION
    onPageChange(number: number) {
        console.log('change to page', number);
        this.config.currentPage = number;
    }

    onChangePageSize(newValue) {
        this.config.itemsPerPage = newValue;
    }
}
