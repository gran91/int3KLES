import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

// ENVIRONMENT
import { environment } from '../environments/environment';

// FIREBASE
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule} from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

// FORMS
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// HTTP
import { HttpClient, HttpClientModule } from '@angular/common/http';

// TRANSLATE
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// Collapse
import { CollapseModule } from 'ngx-bootstrap';

// Util Module
import { UtilsModule } from './utils/utils.module';

// App Loading
import { LoadingComponent } from './utils/loading/loading.component';

import { AppComponent } from './app.component';

// Import containers
import {
  FullLayoutComponent,
  SimpleLayoutComponent
} from './containers';

const APP_CONTAINERS = [
  FullLayoutComponent,
  SimpleLayoutComponent
]

// Import components
import {
  AppAsideComponent,
  AppBreadcrumbsComponent,
  AppFooterComponent,
  AppHeaderComponent,
  AppSidebarComponent,
  AppSidebarFooterComponent,
  AppSidebarFormComponent,
  AppSidebarHeaderComponent,
  AppSidebarMinimizerComponent,
  APP_SIDEBAR_NAV
} from './components';

const APP_COMPONENTS = [
  AppAsideComponent,
  AppBreadcrumbsComponent,
  AppFooterComponent,
  AppHeaderComponent,
  AppSidebarComponent,
  AppSidebarFooterComponent,
  AppSidebarFormComponent,
  AppSidebarHeaderComponent,
  AppSidebarMinimizerComponent,
  APP_SIDEBAR_NAV
]

// Import directives
import {
  AsideToggleDirective,
  NAV_DROPDOWN_DIRECTIVES,
  ReplaceDirective,
  SIDEBAR_TOGGLE_DIRECTIVES
} from './directives';

const APP_DIRECTIVES = [
  AsideToggleDirective,
  NAV_DROPDOWN_DIRECTIVES,
  ReplaceDirective,
  SIDEBAR_TOGGLE_DIRECTIVES
]

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap';
import { TabsModule } from 'ngx-bootstrap/tabs';

// Import Utils Service
import { CookieService } from './utils/service/cookies.service';
import { WindowService } from './utils/service/window.service';
import { CRUDService } from './utils/service/CRUD.service';

// Import Service Services
import {
  AuthService,
  AuthGuardLogin,
  AuthGuardAdmin,
  CurrencyService,
  CountryService,
  UserService,
  GoogleService
} from './services';

const UTILS_SERVICES = [
  CookieService,
  WindowService,
  CRUDService
];

const AUTH_SERVICES = [
  AuthService,
  AuthGuardLogin,
  AuthGuardAdmin
];

const DATA_SERVICES = [
  CurrencyService,
  CountryService,
  UserService
];

const GOOGLE_SERVICES = [
  GoogleService
];

@NgModule({
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    ...APP_COMPONENTS,
    ...APP_DIRECTIVES
  ],
  imports: [
    BrowserModule,
    UtilsModule,
    CollapseModule.forRoot(),
    BrowserAnimationsModule,
    AppRoutingModule,
    ChartsModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => new TranslateHttpLoader(http, '/assets/i18n/', '.json'),
        deps: [HttpClient]
      }
    }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    CollapseModule,
    UtilsModule
  ],
  providers: [
    ...UTILS_SERVICES,
    ...AUTH_SERVICES,
    ...DATA_SERVICES,
    ...GOOGLE_SERVICES,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
