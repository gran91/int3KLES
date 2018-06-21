import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// TRANSLATE
import { TranslateModule } from '@ngx-translate/core';

// Toaster
import { ToasterModule, ToasterService } from 'angular2-toaster/angular2-toaster';

// Collapse
import { CollapseModule } from 'ngx-bootstrap';

// PAGINATION
import { NgxPaginationModule } from 'ngx-pagination';

// Calendar
import { CalendarModule } from 'angular-calendar';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

// Profile
import { ProfileComponent } from './profile.component';

// Timesheet
import { TimesheetComponent } from './timesheet.component';

// Expense
import { ExpenseComponent } from './expense.component';

// Vacation
import { VacationComponent } from './vacation.component';

// Forms Component
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

// Modal Component
import { ModalModule } from 'ngx-bootstrap/modal';

// Tabs Component
import { TabsModule } from 'ngx-bootstrap/tabs';

// Util Module
import { UtilsModule } from '../../utils/utils.module';

// Order Module
import { Ng2OrderModule } from 'ng2-order-pipe';

// Components Routing
import { MyAdminRoutingModule } from './myadmin-routing.module';

registerLocaleData(localeFr);

@NgModule({
  imports: [
    MyAdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    TabsModule,
    ToasterModule,
    CollapseModule,
    TranslateModule,
    UtilsModule,
    Ng2OrderModule,
    NgxPaginationModule,
    CalendarModule.forRoot()
  ],
  declarations: [
    ProfileComponent,
    TimesheetComponent,
    ExpenseComponent,
    VacationComponent
  ]
})
export class MyAdminModule { }
