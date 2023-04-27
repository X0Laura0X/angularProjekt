import { Component, OnInit } from '@angular/core';
import { UserService } from "../../common/services/user.service";
import { User } from "../../common/model/User";
import { AuthService } from "../../common/services/auth.service";
import { Observable } from "rxjs";
import { FormBuilder, Validators } from "@angular/forms";
import firebase from "firebase/compat";
import { Router } from "@angular/router";
import { DialogComponent } from "../../common/dialog/dialog.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit{
  currentUser?: firebase.User | null;
  username: any;
  submitted: boolean = false;
  userUpdateForm = this.createForm({
    id: '',
    name: '',
    email: '',
    password: '',
    passwordAgain: ''
  });

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService, private userService: UserService, public dialog: MatDialog) {
    this.authService.getUserId().then(id => {
      const userId = id as string;
      const user: Observable<User | undefined> = userService.read(userId);
      user.subscribe(value => {
        this.username = value?.name;
      });
    }).catch(error => {
      console.error(error);
    });
  }

  createForm(model: User) {
    let userUpdateForm = this.formBuilder.group(model)
    userUpdateForm.get('name')?.addValidators([
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
    ]);
    userUpdateForm.get('password')?.addValidators([
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(15)
    ]);
    return userUpdateForm;
  }

  saveChanges() {
    this.submitted = true;

    if (this.userUpdateForm.valid) {
      if (this.userUpdateForm.get('name')?.value?.trim() !== '') {
        const user: User = {
          id: this.currentUser?.uid as string,
          name: this.userUpdateForm.get('name')?.value as string,
          email: this.currentUser?.email as string
        };
        this.userService.update(user).then(_ => {
          console.log('Username changed successfully');
        }).catch(error => {
          console.log(error);
        });
      }
      if (this.userUpdateForm.get('password')?.value?.trim() !== '') {
        this.currentUser?.updatePassword(this.userUpdateForm.get('password')?.value as string).then(_ =>{
          console.log('Password changed successfully');
        }).catch(error => {
          console.log(error);
        })
      }
    }
  }

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe(user => {
      this.currentUser = user;
    }, error => {
      console.error(error);
    });
  }

  deleteUser() {
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.delete(this.currentUser?.uid as string).then(_ => {
          if (this.currentUser) {
            this.currentUser.delete().then(() => {
              this.router.navigateByUrl('/login').then(_ => {
                console.log('User deleted successfully');
              });
            }).catch((error) => {
              console.error(error);
            });
          }
        }).catch(error => {
          console.log(error);
        });
      }
    });
  }
}
