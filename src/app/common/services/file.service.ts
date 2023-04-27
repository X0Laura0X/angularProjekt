import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { File } from "../model/File";

@Injectable({
  providedIn: 'root'
})
export class FileService {
  collectionName = 'Files';

  constructor(private angularFirestore: AngularFirestore) { }

  create(file: File) {
    file.id = this.angularFirestore.createId();
    return this.angularFirestore.collection<File>(this.collectionName).doc(file.id).set(file);
  }

  readUserFiles(username: string) {
    return this.angularFirestore.collection<File>(this.collectionName, ref => ref.where('uploader', '==', username)).valueChanges();
  }

  readAll() {
    return this.angularFirestore.collection<File>(this.collectionName).valueChanges();
  }

  update(file: File) {
    return this.angularFirestore.collection<File>(this.collectionName).doc(file.id).update({ type: file.type });
  }

  delete(id: string) {
    return this.angularFirestore.collection<File>(this.collectionName).doc(id).delete();
  }

  readFileById(fileId: string) {
    return this.angularFirestore.collection<File>(this.collectionName, ref => ref.where('id', '==', fileId).limit(1)).valueChanges();
  }
}
