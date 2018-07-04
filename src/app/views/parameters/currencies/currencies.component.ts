import { AfterViewInit, ViewChild, Input } from '@angular/core';
import { CurrenciesListComponent } from './currencies-list.component';
import { CurrenciesDetailComponent } from './currencies-detail.component';

// NEW
// FORMS
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DetailFormComponent } from '../../../utils/components/detail.form.component';
import { CurrencyService } from '../../../services/data/currency.service';
import { ListComponent } from '../../../utils/components/list.component';

import { Component } from '@angular/core';
import { Currency } from '../../../models/currency.model';

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.css']
})
export class CurrenciesComponent implements AfterViewInit {

  /*@ViewChild(CurrenciesListComponent)
  private itemList: CurrenciesListComponent;

  @ViewChild(CurrenciesDetailComponent)
  private itemDetail: CurrenciesDetailComponent;*/

  @ViewChild(ListComponent)
  private itemList: ListComponent;
  @ViewChild(DetailFormComponent)
  private itemDetail: DetailFormComponent;

  currentItem = {};
  mode = 'cancel';
  model: Currency = new Currency();
  @Input() modelname = 'currencies';
  @Input() itemForm: FormGroup;

  constructor(public mainService: CurrencyService) {
    this.itemForm = new FormGroup({
      code: new FormControl({ value: '' }, Validators.required),
      name: new FormControl({ value: '' }, Validators.required)
    });
  }

  ngAfterViewInit() {
  }

  changeItem(event) {
    console.log('Change Item:', event);
    this.currentItem = event;
  }

  changeAction(event) {
    console.log('#########New mode for Currencies.comp:', event);
    this.mode = event;
    this.onChangeMode();
  }

  onChangeMode() {
    if (this.mode === 'cancel') {
      this.itemList.unselect();
    }
  }
}
