
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster';

import { AuthService } from '../../services/auth/auth.service';
import { GoogleService } from '../../services/google/google.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['../../../scss/vendors/toastr/toastr.scss'],
  providers: [AuthService, GoogleService],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  email = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]);
  password = new FormControl('', [Validators.required, Validators.minLength(8)]);

  private toasterService: ToasterService;

  public toasterconfig: ToasterConfig =
  new ToasterConfig({
    tapToDismiss: true,
    timeout: 5000
  });

  constructor(public auth: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    public toast: ToasterService) {
    this.toasterService = toast;
  }

  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
    this.loginForm = this.formBuilder.group({
      email: this.email,
      password: this.password
    });
  }

  setClassEmail() {
    return { 'has-danger': !this.email.pristine && !this.email.valid };
  }
  setClassPassword() {
    return { 'has-danger': !this.password.pristine && !this.password.valid };
  }

  login() {
    this.auth.signInWithGoogle().then((data) => {
      console.log('Data Login:', data);
      this.router.navigate(['/dashboard']);
    });

  }

}
