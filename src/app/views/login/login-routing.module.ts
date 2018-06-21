import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { LogoutComponent } from './logout.component';
import { RegisterComponent } from './register.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Authentication'
    },
    children: [
      {
        path: '',
        component: LoginComponent,
        data: {
          title: 'Login Page'
        }
      },
      {
        path: 'logout',
        component: LogoutComponent,
        data: {
          title: 'Logout Page'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule {}
