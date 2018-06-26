import { Component, OnInit, NgModule } from '@angular/core';
import { CurrencyService } from '../../../services/data/currency.service';
// FORMS
import { FormGroup, FormControl, Validators } from '@angular/forms';

// TOASTER
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster';

// TRANSLATE
import { TranslateService } from '@ngx-translate/core';
import { SimpleDetailComponent } from '../../../utils/components/simpledetail.component';

@Component({
    selector: 'app-currencies-detail',
    templateUrl: './currencies-detail.component.html',
    styleUrls: ['./currencies-detail.component.css'],
})
export class CurrenciesDetailComponent extends SimpleDetailComponent implements OnInit {

    constructor(public mainService: CurrencyService,
        public toaster: ToasterService,
        public translate: TranslateService) {
        super(mainService, toaster, translate);
        this.itemForm = new FormGroup({
            code: new FormControl({ value: '', disabled: !this.isEditing }, Validators.required),
            name: new FormControl({ value: '', disabled: !this.isEditing }, Validators.required)
        });
    }

    ngOnInit() {

    }
}
