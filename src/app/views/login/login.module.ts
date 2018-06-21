import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToasterModule, ToasterService} from 'angular2-toaster';
import { LoginComponent } from './login.component';
import { LogoutComponent } from './logout.component';
import { RegisterComponent } from './register.component';
import { LoginRoutingModule } from './login-routing.module';
import { UserService } from '../../services/data/user.service';
import { AuthService } from '../../services/auth/auth.service';
import { AuthGuardLogin } from '../../services/auth/auth-guard-login.service';
import { AuthGuardAdmin } from '../../services/auth/auth-guard-admin.service';


@NgModule({
  imports: [
    LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToasterModule
  ],
  declarations: [
    LoginComponent,
    LogoutComponent,
    RegisterComponent
  ],
  providers: [
    AuthService,
    AuthGuardLogin,
    AuthGuardAdmin,
    UserService
  ]
})
export class LoginModule { }
