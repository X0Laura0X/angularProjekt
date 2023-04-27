import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Brofist } from "../model/Brofist";
import { map } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BrofistService {
  collectionName = 'Brofists';

  constructor(private angularFirestore: AngularFirestore) { }

  async create(brofist: Brofist) {
    const added = await this.isAdded(brofist.username, brofist.fileId).toPromise();
    if (!added) {
      brofist.id = this.angularFirestore.createId();
      return this.angularFirestore.collection<Brofist>(this.collectionName).doc(brofist.id).set(brofist);
    } else {
      return undefined;
    }
  }

  readAll(fileId: string) {
    return this.angularFirestore.collection<Brofist>(this.collectionName, ref => ref.where('fileId', '==', fileId)).valueChanges();
  }

  delete(fileId: string, username: string) {
    this.angularFirestore.collection<Brofist>(this.collectionName, ref => ref.where('username', '==', username).where('fileId', '==', fileId)).get().subscribe(querySnapshot => {
      querySnapshot.forEach(doc => {
        doc.ref.delete();
      });
    });
  }

  isAdded(username: string, fileId: string) {
    return this.angularFirestore.collection<Brofist>(this.collectionName, ref => ref
      .where('username', '==', username)
      .where('fileId', '==', fileId))
      .get()
      .pipe(map(snapshot => snapshot.size > 0));
  }
}
