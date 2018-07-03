import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
// FORMS
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

// TRANSLATE
import { TranslateService } from '@ngx-translate/core';
import 'rxjs/add/operator/map';

@Component({
    selector: 'app-item-form',
    template: '<div>itemForm</div>'
})
export class ItemFormComponent implements OnInit, OnChanges {

    @Input() item = {};
    @Input() mode = 'cancel';

    itemForm: FormGroup;
    @Output() onItemFormChange = new EventEmitter<FormGroup>();

    constructor(public translate: TranslateService) {
        this.buildItemForm();
    }

    ngOnInit() {
        console.log('Element from Form:', this.itemForm.controls);
        this.onItemFormChange.emit(this.itemForm);
    }

    buildItemForm() {
        this.itemForm = new FormGroup({
            code: new FormControl({ value: '' }, Validators.required),
            name: new FormControl({ value: '' }, Validators.required)
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        console.log('AllChanges:', changes);
        if (changes.mode) {
            const mode: SimpleChange = changes.mode;
            console.log('prev value: ', mode.previousValue);
            console.log('got name: ', mode.currentValue);
            this.mode = mode.currentValue;
            this.accessibleForm();
        }

        if (changes.item) {
            const item: SimpleChange = changes.item;
            console.log('prev value: ', item.previousValue);
            console.log('got name: ', item.currentValue);
            // this.item = item.currentValue;
            this.itemForm.setValue(this.updateForm(item.currentValue));
        }
    }

    updateForm(newvalue) {
        let newitem = {};
        Object.keys(this.itemForm.controls).forEach(key => {
            if (newvalue[key]) {
                newitem[key] = newvalue[key];
            } else {
                newitem[key] = '';
            }
        });
        return newitem;
    }

    accessibleForm() {
        Object.keys(this.itemForm.controls).forEach(key => {
            if (this.mode === 'cancel') {
                this.item = {};
            }
            if (this.mode === 'display') {
                this.itemForm.get(key).disable();
            } else {
                this.itemForm.get(key).enable();
            }
        });
    }
}
