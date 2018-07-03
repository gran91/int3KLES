import { Component, OnInit, Input } from '@angular/core';
import { ItemFormComponent } from '../../../../utils/components/item.form.component';
// FORMS
import { FormGroup, FormControl, Validators } from '@angular/forms';
// TRANSLATE
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-currencies-form',
    templateUrl: './currencies.form.component.html'
})
export class CurrenciesFormComponent extends ItemFormComponent {

    constructor(public translate: TranslateService) {
        super(translate);
    }

    buildItemForm() {
        this.itemForm = new FormGroup({
            code: new FormControl({ value: '' }, Validators.required),
            name: new FormControl({ value: '' }, Validators.required)
        });
    }
}
