import { Component } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { User } from "../../common/model/User";
import { AuthService } from "../../common/services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  submitted: boolean = false;
  error: string = '';
  loginForm = this.createForm({
    id: '',
    name: '',
    email: '',
    password: '',
    passwordAgain: ''
  });

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) { }

  createForm(model: User) {
    let loginForm = this.formBuilder.group(model);
    loginForm.get('email')?.addValidators([
      Validators.required,
      Validators.maxLength(50)
    ]);
    loginForm.get('password')?.addValidators([
      Validators.required,
      Validators.maxLength(15)
    ]);
    return loginForm;
  }

  login() {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value).then(_ => {
        this.router.navigateByUrl('/download').then(_ => {
          this.router.navigateByUrl('/download').then(_ => {
            this.error = '';
          });
        });
      }).catch(_ => {
        this.error = 'User does not exist';
      });
    }
  }
}
