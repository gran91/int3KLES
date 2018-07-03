import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Input, Output, NgModule } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PaginationInstance } from 'ngx-pagination';

@Component({
    selector: 'app-pagination',
    styleUrls: ['../../../scss/vendors/toastr/toastr.scss'],
    templateUrl: './nav.pagination.component.html',
    changeDetection: ChangeDetectionStrategy.Default
})
export class NavPaginationComponent implements OnInit {

    @Input() config: PaginationInstance = {
        id: 'advanced',
        itemsPerPage: 10,
        currentPage: 1
    };

    @Input() maxSize = 7;
    @Input() directionLinks = true;
    @Input() autoHide = false;

    public paginationLabel: any = {
        previousLabel: 'Previous',
        nextLabel: 'Next',
        screenReaderPaginationLabel: 'Pagination',
        screenReaderPageLabel: 'page',
        screenReaderCurrentLabel: `label`
    };

    constructor(public translate: TranslateService, ) {
        this.paginationLabel.previousLabel = this.translate.instant(this.paginationLabel.previousLabel);
        this.paginationLabel.nextLabel = this.translate.instant(this.paginationLabel.nextLabel);
        this.paginationLabel.screenReaderPaginationLabel = this.translate.instant(this.paginationLabel.screenReaderPaginationLabel);
        this.paginationLabel.screenReaderPageLabel = this.translate.instant(this.paginationLabel.screenReaderPageLabel);
        this.paginationLabel.screenReaderPageLabel = this.translate.instant(this.paginationLabel.screenReaderPageLabel);
    }


    ngOnInit() {

    }

    onPageChange(number: number) {
        console.log('change to page', number);
        this.config.currentPage = number;
    }

    onChangePageSize(newValue) {
        this.config.itemsPerPage = newValue;
    }
}
