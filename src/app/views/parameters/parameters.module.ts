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

// Countries
import { CountriesComponent } from './countries/countries.component';
import { CountriesListComponent } from './countries/countries-list.component';
import { CountriesDetailComponent } from './countries/countries-detail.component';

// Currencies
import { CurrenciesComponent } from './currencies/currencies.component';
import { CurrenciesListComponent } from './currencies/currencies-list.component';
import { CurrenciesDetailComponent } from './currencies/currencies-detail.component';

// NEW
import { CurrenciesDetailFormComponent } from './currencies/detail/currencies.detail.component';
import { CurrenciesFormComponent } from './currencies/detail/currencies.form.component';

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
import { ParametersRoutingModule } from './parameters-routing.module';

@NgModule({
  imports: [
    ParametersRoutingModule,
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
    NgxPaginationModule
  ],
  declarations: [
    CountriesComponent,
    CountriesListComponent,
    CountriesDetailComponent,
    CurrenciesComponent,
    CurrenciesListComponent,
    CurrenciesDetailComponent,
    // NEW
    CurrenciesFormComponent,
    CurrenciesDetailFormComponent
  ]
})
export class ParametersModule { }
