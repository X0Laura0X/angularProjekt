import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { User } from "../model/User";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  collectionName: string = 'Users';

  constructor(private angularFirestore: AngularFirestore) { }

  create(user: User) {
    return this.angularFirestore.collection<User>(this.collectionName).doc(user.id).set(user);
  }

  read(id: string) {
    return this.angularFirestore.collection<User>(this.collectionName).doc(id).valueChanges();
  }

  update(user: User) {
    return this.angularFirestore.collection<User>(this.collectionName).doc(user.id).set(user);
  }

  delete(id: string) {
    return this.angularFirestore.collection<User>(this.collectionName).doc(id).delete();
  }
}
