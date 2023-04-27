import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../common/services/auth.service";
import { File } from "../../common/model/File";
import { FileService } from "../../common/services/file.service";
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { finalize, Observable } from "rxjs";
import { User } from "../../common/model/User";
import { UserService } from "../../common/services/user.service";
import { DatePipe } from "@angular/common";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "../../common/dialog/dialog.component";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {
  username: any;
  dataSource: any;
  columns = ['type', 'name', 'createdAt', 'delete']
  files: Array<File> | undefined;
  selectedFile: any;
  isSelected = false;
  fileId: any;
  uploadPercentage = 0;
  submitted: boolean = false;
  uploadFileForm = this.createForm({
    id: '',
    name: '',
    type: 'movie',
    createdAt: '',
    uploader: '',
    file: ''
  });

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService, private fileService: FileService, private userService: UserService, private storage: AngularFireStorage, public dialog: MatDialog) {
    this.authService.getUserId().then(id => {
      const userId = id as string;
      const user: Observable<User | undefined> = userService.read(userId);
      user.subscribe(value => {
        this.username = value?.name;
        this.fileService.readUserFiles(this.username).subscribe(files => {
          this.dataSource = files;
        });
      });
    }).catch(error => {
      console.error(error);
    });
  }

  createForm(model: File) {
    let uploadFileForm = this.formBuilder.group(model);
    uploadFileForm.get('type')?.addValidators([
      Validators.required,
    ]);
    uploadFileForm.get('name')?.addValidators([
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(20),
      this.haveExtension.bind(this)
    ]);
    uploadFileForm.get('file')?.addValidators([
      Validators.required,
    ]);
    return uploadFileForm;
  }

  haveExtension(control: FormControl) {
    const fileName: string = control.value;
    if (fileName && fileName.indexOf('.') !== -1 && fileName.lastIndexOf('.') !== fileName.length - 1) {
      return null;
    }
    return { extension: true };
  }

  uploadFile() {
    this.submitted = true;
    if (this.uploadFileForm.valid) {
      const datePipe = new DatePipe('en-US');
      const formattedDate = datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm');
      const file: File = {
        name: this.uploadFileForm.get('name')?.value as string,
        type: this.uploadFileForm.get('type')?.value as string,
        createdAt: formattedDate as string,
        uploader: this.username
      };
      this.fileService.create(file).then(_ => {
        this.uploadFileToStorage();
        console.log('File create successfully');
      }).catch(error => {
        console.log(error);
      });
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.isSelected = true;
  }

  uploadFileToStorage() {
    const filePath = `uploads/${this.uploadFileForm.get('name')?.value}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, this.selectedFile);
    task.percentageChanges().subscribe((percentage) => {
      this.uploadPercentage = percentage || 0;
    });
    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(_ => {
          console.log('File uploaded successfully');
        });
      })
    ).subscribe();
  }

  deleteFile(id: string) {
    const dialogRef = this.dialog.open(DialogComponent);
    dialogRef.afterClosed().toPromise().then(result => {
      if (result) {
        this.fileService.delete(id).then(_ => {
          console.log('File deleted successfully');
        });
      }
    });
  }

  showDetails(id: string) {
    this.fileId = id;
  }
}
