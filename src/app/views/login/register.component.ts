import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  templateUrl: 'register.component.html'
})
export class RegisterComponent {

  constructor(public auth: AuthService) { }

}
