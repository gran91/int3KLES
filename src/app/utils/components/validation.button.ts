import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { CRUDService } from '../../utils/service/CRUD.service';
// FORMS
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

// TOASTER
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster';

// TRANSLATE
import { TranslateService } from '@ngx-translate/core';
import 'rxjs/add/operator/map';

@Component({
    selector: 'app-validation-button',
    templateUrl: './validation.button.html'
})
export class ValidationButtonComponent implements OnInit, OnChanges {
    @Input() mode = '';
    @Input() formLink: FormGroup;
    @Output() onAction = new EventEmitter();

    buttonForm: FormGroup;
    activeAdd = false;
    activeValidate = false;
    activeModify = false;
    activeCancel = true;

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges): void {
        console.log('Change form Validation Button:', changes);
        if (changes.mode) {
            const mode: SimpleChange = changes.mode;
            console.log('prev mode: ', mode.previousValue);
            console.log('new mode: ', mode.currentValue);
            this.mode = mode.currentValue;
            this.updateFormMode();
        }

        if (changes.formLink) {
            this.formLink = changes.formLink.currentValue;
        }
    }

    updateFormMode() {
        console.log('UpdateFormMode=', this.mode);
        this.activeAdd = false;
        this.activeValidate = false;
        this.activeModify = false;
        if (this.mode === 'cancel') {
            this.activeAdd = true;
        }
        if (this.mode === 'modify' || this.mode === 'update') {
            this.activeValidate = true;
        }
        if (this.mode === 'display') {
            this.activeModify = true;
        }
    }

    modify() {
        this.mode = 'modify';
        this.updateFormMode();
        this.onAction.emit('modify');
    }

    update() {
        this.mode = 'update';
        this.updateFormMode();
        this.onAction.emit('update');
    }

    add() {
        this.onAction.emit('add');
    }

    reset() {
        this.updateFormMode();
        this.onAction.emit('cancel');
    }
}
