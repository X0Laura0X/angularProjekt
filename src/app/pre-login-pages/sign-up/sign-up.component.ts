import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../common/services/auth.service";
import { User } from "../../common/model/User";
import { UserService } from "../../common/services/user.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  submitted: boolean = false;
  error: string = '';
  signupForm = this.createForm({
    id: '',
    name: '',
    email: '',
    password: '',
    passwordAgain: ''
  });

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService, private userService: UserService) { }

  createForm(model: User) {
    let signupForm = this.formBuilder.group(model);
    signupForm.get('name')?.addValidators([
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
    ]);
    signupForm.get('email')?.addValidators([
      Validators.required,
      Validators.maxLength(50),
      this.validateEmailFormat.bind(this)
    ]);
    signupForm.get('password')?.addValidators([
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(15)
    ]);
    signupForm.get('passwordAgain')?.addValidators([
      Validators.required,
      Validators.maxLength(15),
      this.matchPasswords.bind(this)
    ]);
    return signupForm;
  }

  matchPasswords(control: FormControl) {
    const password = this.signupForm.get('password')?.value;
    const passwordAgain = control.value;
    if (password !== passwordAgain) {
      return { passwordMatch: true };
    } else {
      return null;
    }
  }

  validateEmailFormat(control: FormControl) {
    const emailRegex = /^([\w.\-_]+)?\w+@[\w-_]+(\.\w+)+$/;
    const valid = emailRegex.test(control.value);
    return valid ? null : { validateEmailFormat: true };
  }

  signup() {
    this.submitted = true;
    if (this.signupForm.valid) {
      this.authService.signup(this.signupForm.get('email')?.value, this.signupForm.get('password')?.value).then(credential => {
        console.log(credential);
        const user: User = {
          id: credential.user?.uid as string,
          email: this.signupForm.get('email')?.value as string,
          name: this.signupForm.get('name')?.value as string
        }
        this.userService.create(user).then(_ => {
          this.router.navigateByUrl('/download').then(_ => {
            console.log('User create successfully');
          });
        }).catch(_ => {
          this.error = 'Email is already in use';
        });
      }).catch(_ => {
        this.error = 'Email is already in use';
      })
    }
  }
}
