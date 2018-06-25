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

  isCreationMode = true;
  currentItem = {};

  constructor() {
    this.isCreationMode = true;
  }

  ngAfterViewInit() {
  }

  changeItem(event) {
    console.log(event);
    if (event.code !== '') {
      this.isCreationMode = false;
    }
    this.currentItem = event;
  }

  reset(event) {
    this.isCreationMode = true;
    this.itemList.unselect();
  }
}
