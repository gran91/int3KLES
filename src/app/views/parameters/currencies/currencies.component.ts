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
  isEditing = false;
  isDelete = false;
  currentItem = {};

  constructor() {
    this.isCreationMode = true;
  }

  ngAfterViewInit() {
  }

  changeItem(event) {
    console.log('Change Item:', event);
    if (event.code !== '') {
      this.isCreationMode = false;
    }
    this.currentItem = event;
  }

  enableEdit(event) {
    console.log('Enable Edit:', event);
    this.isEditing = event;
  }

  enableDelete(event) {
    console.log('Enable Delete:', event);
    this.isDelete = event;
  }

  reset(event) {
    this.isCreationMode = true;
    this.itemList.unselect();
  }
}
