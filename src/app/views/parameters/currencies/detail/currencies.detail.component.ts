import { AfterViewInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Component } from '@angular/core';
// FORMS
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CurrenciesFormComponent } from './currencies.form.component';
import { ValidationButtonComponent } from '../../../../utils/components/validation.button';
// TOASTER
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster';
// TRANSLATE
import { TranslateService } from '@ngx-translate/core';
// SERVICES
import { CurrencyService } from '../../../../services/data/currency.service';

@Component({
  selector: 'app-currencies-detail-form',
  templateUrl: './currencies.detail.component.html'
})
export class CurrenciesDetailFormComponent implements AfterViewInit {

  @ViewChild(CurrenciesFormComponent)
  private itemFormComponent: CurrenciesFormComponent;

  @ViewChild(ValidationButtonComponent)
  private buttonFormComponent: ValidationButtonComponent;

  @Input() mode = 'cancel';
  @Input() item;
  @Output() onChangeMode = new EventEmitter();

  itemForm: FormGroup;
  public toasterconfig: ToasterConfig = new ToasterConfig({
    tapToDismiss: true,
    timeout: 5000
  });


  constructor(public mainService: CurrencyService, public translate: TranslateService, public toaster: ToasterService) {
  }

  ngAfterViewInit() {
  }

  onAction(event) {
    console.log('###Mode from parent=', event);
    this.mode = event;
    this.onChangeMode.emit(event);
    if (this.mode === 'add') {
      this.add();
      this.onChangeMode.emit('modify');
    } else if (this.mode === 'update') {
      this.update();
      this.onChangeMode.emit('modify');
    }
  }

  add() {
    this.mainService.add(this.itemForm.value);
    this.toaster.pop('success', this.translate.instant('message.add.title'), this.translate.instant('message.add.success'));
  }

  update() {
    console.log('Current item:', this.item);
    const value = this.itemForm.value;
    console.log('Value form:', value);
    value['id'] = this.item.id;
    console.log('Item to update:', value);
    this.mainService.update(value);
    this.toaster.pop('success', this.translate.instant('message.update.title'), this.translate.instant('message.update.success'));
  }

  onItemFormChange(event) {
    console.log('{{{onItemFormChange from parent=', event);
    this.itemForm = event;
  }
}
