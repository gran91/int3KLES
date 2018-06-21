import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Input, Output, NgModule } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster';
import { TranslateService } from '@ngx-translate/core';
import { PaginationInstance } from 'ngx-pagination';
import { Observable } from 'rxjs/Observable';
import { CRUDService } from '../service/CRUD.service';
import { AngularFirestoreDocument } from 'angularfire2/firestore';

@Component({
    selector: 'app-countries-list',
    styleUrls: ['../../../../scss/vendors/toastr/toastr.scss'],
    templateUrl: './countries-list.component.html',
    changeDetection: ChangeDetectionStrategy.Default
})
export class SimpleTableListComponent implements OnInit {
    @Input() selectedRow = {};
    setClickedRow: Function;
    @Output() onSelectedRow = new EventEmitter();

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
        itemsPerPage: 10,
        currentPage: 1
    };
    public paginationLabel: any = {
        previousLabel: 'Previous',
        nextLabel: 'Next',
        screenReaderPaginationLabel: 'Pagination',
        screenReaderPageLabel: 'page',
        screenReaderCurrentLabel: `label`
    };

    private toasterService: ToasterService;

    public toasterconfig: ToasterConfig = new ToasterConfig({
        tapToDismiss: true,
        timeout: 5000
    });

    constructor(private mainService: CRUDService,
        public toast: ToasterService,
        private translate: TranslateService
    ) {
        this.toasterService = toast;
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
            },
            error => console.log(error),
            () => this.isLoading = false
        );
    }

    add(item) {
        this.mainService.add(item);
        this.toasterService.pop('success', 'Add', 'item added successfully.');
    }

    edit(item) {
        this.mainService.update(item);
        this.toasterService.pop('success', 'Edit', 'item edited successfully.');
    }

    delete(item) {
        if (window.confirm('Are you sure you want to permanently delete this item?')) {
            this.mainService.delete(item);
            this.toasterService.pop('success', 'Delete', 'item deleted successfully.');
        }
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
}
