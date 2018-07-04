import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster';
import { TranslateService } from '@ngx-translate/core';
import { PaginationInstance } from 'ngx-pagination';
import { Observable } from 'rxjs/Observable';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmDialogComponent } from '../confirmation/confirm-dialog.component';
import { CRUDService } from '../service/CRUD.service';
import { AngularFirestoreDocument } from 'angularfire2/firestore';
// MODAL
import { ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { IModel } from '../../models/IModel.model';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['../../../scss/vendors/toastr/toastr.scss'],
    changeDetection: ChangeDetectionStrategy.Default
})

export class ListComponent implements OnInit, OnChanges {
    @Input() selectedRow = {};
    setClickedRow: Function;
    @Output() onSelectedRow = new EventEmitter();
    @Output() onAction = new EventEmitter();
    currentMode = 'add';
    modifyclick = false;
    @Input() model: IModel;
    @Input() mainService: CRUDService;

    listColumn: String[] = ['id'];


    // FIREBASE
    itemDoc: AngularFirestoreDocument<any>;
    items = [];
    item = {};

    // MODAL
    @ViewChild('detailModal') public detailModal: ModalDirective;

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

    public toasterconfig: ToasterConfig = new ToasterConfig({
        tapToDismiss: true,
        timeout: 5000
    });

    constructor(public toasterService: ToasterService,
        public translate: TranslateService,
        public _bsModalService: BsModalService
    ) {
        this.onAction.subscribe(action => this.currentMode = action);
        this.setClickedRow = function (index) {
            if (!this.modifyclick) {
                this.onAction.emit('display');
            } else {
                this.modifyclick = false;
            }
            this.selectedRow = index;
            this.onSelectedRow.emit(this.selectedRow);
        }
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        console.log('################### LIST COMPONENT AllChanges:', changes);
        if (changes.model) {
            this.model = changes.model.currentValue;
            this.listColumn = this.model.getListField();
            /*Object.keys(this.model).forEach(key => {
                console.log('##############KEY', key);
                if (key !== 'id') {
                    const col = { key: key };
                    this.listColumn.push(col);
                }
            }
            );*/
        }

        if (changes.mainService) {
            this.mainService = changes.mainService.currentValue;
            this.mainService.list().subscribe(datas => {
                this.items = datas;
            });
        }
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

    edit(item) {
        this.modifyclick = true;
        this.onAction.emit('modify');
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
                this.onAction.emit('delete');
            } else if (result === false) {
                this.toasterService.pop('warning', this.translate.instant('main.delete'), this.translate.instant('message.delete.cancel'));
                this.onAction.emit('delete');
                // this.onDelete.emit('cancel');
            } else {
                this.onAction.emit('delete');
                // When closing the modal without no or yes
            }
        });
    }

    // MODAL
    addModal() {
        this.detailModal.show();
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
