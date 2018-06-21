import { Component, Input, OnInit, NgModule } from '@angular/core';
import { CountryService } from '../../../services/data/country.service';
// FORMS
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

// TOASTER
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster';

// TRANSLATE
import { TranslateService } from '@ngx-translate/core';


import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

@Component({
    selector: 'app-countries-detail',
    templateUrl: './countries-detail.component.html',
    styleUrls: ['./countries-detail.component.css'],
})
export class CountriesDetailComponent implements OnInit {

    @Input() item = {};

    isLoading = true;
    isEditing = false;

    public toasterconfig: ToasterConfig =
    new ToasterConfig({
        tapToDismiss: true,
        timeout: 5000
    });
    private toasterService: ToasterService;

    itemForm: FormGroup;
    inputname = new FormControl('', Validators.required);
    inputcode = new FormControl('', Validators.required);

    constructor(private mainService: CountryService,
        private formBuilder: FormBuilder,
        public toaster: ToasterService,
        private translate: TranslateService) {
    }

    ngOnInit() {
    }

    enableEditing(item) {
        this.isEditing = true;
        this.item = item;
    }

    cancelEditing() {
        this.isEditing = false;
        this.item = {}
    }

    edit(item) {
        this.mainService.update(item);
        this.toaster.pop('success', 'Edit', 'item edited successfully.');
    }

    add() {
        console.log('Add:', this.itemForm.value);
        this.mainService.add(this.itemForm.value);
        this.itemForm.reset();
        this.toaster.pop('success', 'Add', 'item added successfully.');
    }

    reset() {
        this.item = {};
    }

}
