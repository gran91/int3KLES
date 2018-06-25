import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Input, Output, NgModule } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster';
import { TranslateService } from '@ngx-translate/core';
import { PaginationInstance } from 'ngx-pagination';
import { CurrencyService } from '../../../services/data/currency.service';
import { CountryService } from '../../../services/data/country.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Country } from '../../../models/country.model';
import { ConfirmDialogComponent } from '../../../utils/confirmation/confirm-dialog.component';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-countries-list',
  styleUrls: ['../../../../scss/vendors/toastr/toastr.scss'],
  templateUrl: './countries-list.component.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class CountriesListComponent implements OnInit {
  @Input() selectedRow = {};
  setClickedRow: Function;

  @Output() onSelectedRow = new EventEmitter();

  countryCollection: AngularFirestoreCollection<Country>;
  CountryDoc: AngularFirestoreDocument<Country>;

  // FIREBASE
  currencies = [];
  items: Country[];
  item = {};

  filter = {};

  // Sorting
  key = 'name';
  reverse = false;

  isLoading = true;
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

  public toasterconfig: ToasterConfig =
  new ToasterConfig({
    tapToDismiss: true,
    timeout: 5000
  });

  addCountryForm: FormGroup;
  name = new FormControl('', Validators.required);
  code = new FormControl('', Validators.required);

  constructor(private currencyService: CurrencyService,
    private countryService: CountryService,
    private formBuilder: FormBuilder,
    public toasterService: ToasterService,
    private translate: TranslateService,
    private afs: AngularFirestore,
    private _bsModalService: BsModalService
  ) {
    this.setClickedRow = function (index) {
      this.selectedRow = index;
      this.onSelectedRow.emit(this.selectedRow);
    }
  }

  ngOnInit() {
    this.translatePaginationControl();
    /*this.countryService.list().subscribe(datas => {
      this.country = datas as Country[];
    });*/
    this.list();
    this.addCountryForm = this.formBuilder.group({
      name: this.name,
      code: this.code
    });
  }

  translatePaginationControl() {
    this.translate.get(this.paginationLabel.previousLabel).subscribe((res: String) => {
      this.paginationLabel.previousLabel = res;
    });
    this.translate.get(this.paginationLabel.nextLabel).subscribe((res: String) => {
      this.paginationLabel.nextLabel = res;
    });
  }

  list() {
    this.countryService.list().subscribe(
      data => {
        console.log('IsLoading:', this.isLoading);
        this.items = data as Country[];
        this.isLoading = false;
      },
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  add() {
    this.countryService.add(this.addCountryForm.value);
    this.toasterService.pop('success', 'Add', 'item added successfully.');
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

  edit(item) {
     this.countryService.update(item);
    this.toasterService.pop('success', 'Edit', this.translate.instant('message.delete.success'));
  }

  delete(item) {
    console.log(this.translate.instant('message.delete.success'));
    const modal = this._bsModalService.show(ConfirmDialogComponent);
    (<ConfirmDialogComponent>modal.content).showConfirmationModal(
      'Delete',
      'Would you like to delete this item:' + item.id + ' ?'
    );

    (<ConfirmDialogComponent>modal.content).onClose.subscribe(result => {
      if (result === true) {
        this.CountryDoc = this.afs.doc(`country/${item.id}`);
        this.CountryDoc.delete();
        this.toasterService.pop('success', 'Delete', 'item deleted successfully.');
      } else if (result === false) {
        this.toasterService.pop('warning', 'Delete', 'Cancel delete');
      } else {
        // When closing the modal without no or yes
      }
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
