import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Input, Output, NgModule } from '@angular/core';
import { ToasterService} from 'angular2-toaster/angular2-toaster';
import { TranslateService } from '@ngx-translate/core';
import { CurrencyService } from '../../../services/data/currency.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { SimpleTableListComponent } from '../../../utils/components/simpletablelist.component';


@Component({
  selector: 'app-currencies-list',
  styleUrls: ['../../../../scss/vendors/toastr/toastr.scss'],
  templateUrl: './currencies-list.component.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class CurrenciesListComponent extends SimpleTableListComponent implements OnInit {

  constructor(
    public currencyService: CurrencyService,
    public toasterService: ToasterService,
    public translate: TranslateService,
    public _bsModalService: BsModalService
  ) {
    super(currencyService, toasterService, translate, _bsModalService);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
