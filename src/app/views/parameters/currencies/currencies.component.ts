import { AfterViewInit, ViewChild } from '@angular/core';
import { CurrenciesListComponent } from './currencies-list.component';
import { CurrenciesDetailComponent } from './currencies-detail.component';

import { Component } from '@angular/core';

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.css']
})
export class CurrenciesComponent implements AfterViewInit {

  @ViewChild(CurrenciesListComponent)
  private itemList: CurrenciesListComponent;

  @ViewChild(CurrenciesDetailComponent)
  private itemDetail: CurrenciesDetailComponent;

  currentItem = {};
  mode = 'cancel';

  constructor() {
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
