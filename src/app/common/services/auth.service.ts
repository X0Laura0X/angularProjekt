import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private firebaseAuth: AngularFireAuth) { }

  login(email: any, password: any) {
    return this.firebaseAuth.signInWithEmailAndPassword(email, password);
  }

  signup(email: any, password: any) {
    return this.firebaseAuth.createUserWithEmailAndPassword(email, password);
  }

  logout() {
    return this.firebaseAuth.signOut();
  }

  isLoggedIn() {
    return this.firebaseAuth.user;
  }

  getUserId() {
    return new Promise<string>((resolve, reject) => {
      this.firebaseAuth.onAuthStateChanged(user => {
        if (user) {
          resolve(user.uid);
        } else {
          reject('No user is currently signed in.');
        }
      }).then(_ => { });
    });
  }
}
