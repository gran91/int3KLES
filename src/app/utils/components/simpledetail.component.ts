import { Component, Input, OnInit, NgModule } from '@angular/core';
import { CRUDService } from '../../utils/service/CRUD.service';
// FORMS
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

// TOASTER
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster';

// TRANSLATE
import { TranslateService } from '@ngx-translate/core';
import 'rxjs/add/operator/map';

@Component({
    selector: 'app-detail',
    template: '<div>SimpleTableList</div>'
})
export class SimpleDetailComponent implements OnInit {

    @Input() item = {};
    @Input() isEditing = false;

    public toasterconfig: ToasterConfig =
    new ToasterConfig({
        tapToDismiss: true,
        timeout: 5000
    });

    itemForm: FormGroup;

    constructor(public itemService: CRUDService,
        public toaster: ToasterService,
        public translate: TranslateService) {
    }

    ngOnInit() {
    }

    enableEditing(item) {
        //  this.isEditing = true;
        // this.item = item;
    }

    cancelEditing() {
        this.isEditing = false;
        this.item = {}
    }

    update() {
        this.itemService.update(this.itemForm.value);
        this.toaster.pop('success', 'Edit', 'item edited successfully.');
    }

    add() {
        this.itemService.add(this.itemForm.value);
        this.toaster.pop('success', 'Add', 'item added successfully.');
    }

    reset() {
        this.isEditing = false;
        this.item = {};
    }
}
