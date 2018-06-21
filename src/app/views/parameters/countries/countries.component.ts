import { AfterViewInit, ViewChild } from '@angular/core';
import { CountriesListComponent } from './countries-list.component';
import { CountriesDetailComponent } from './countries-detail.component';

import { Component } from '@angular/core';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements AfterViewInit {

  @ViewChild(CountriesListComponent)
  private itemList: CountriesListComponent;

  @ViewChild(CountriesDetailComponent)
  private itemDetail: CountriesDetailComponent;

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
