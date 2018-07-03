import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
// FORMS
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';

// TRANSLATE
import { TranslateService } from '@ngx-translate/core';
import 'rxjs/add/operator/map';

@Component({
    selector: 'app-item-form',
    templateUrl: './item.form.component.html'
})
export class ItemFormComponent implements OnInit, OnChanges {

    @Input() item = {};
    @Input() mode = 'cancel';

    @Input() modelname = '';
    @Input() itemForm: FormGroup;
    @Output() onItemFormChange = new EventEmitter<FormGroup>();

    listControl = [];

    constructor(public translate: TranslateService) {
        this.buildItemForm();
    }

    ngOnInit() {

    }

    buildItemForm() {
        this.itemForm = new FormGroup({ code: new FormControl({ value: '' }, Validators.required) });
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

        if (changes.itemForm) {
            this.itemForm = changes.itemForm.currentValue;
            console.log('##??## NEW ITEM FORM:', this.itemForm);
            Object.keys(this.itemForm.controls).forEach(key => {
                const data = {
                    key: key
                };
                const ctrl: AbstractControl = this.itemForm.get(key);
                this.listControl.push(data);
            });
            console.log(JSON.stringify(this.listControl));
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
