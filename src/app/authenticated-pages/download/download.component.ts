import { Component } from '@angular/core';
import { File } from "../../common/model/File";
import { FileService } from "../../common/services/file.service";
import { Observable } from "rxjs";
import { User } from "../../common/model/User";
import { AuthService } from "../../common/services/auth.service";
import { UserService } from "../../common/services/user.service";
import { AngularFireStorage } from "@angular/fire/compat/storage";

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent {
  dataSource: any;
  columns = ['type', 'name', 'createdAt', 'uploader', 'download'];
  files: Array<File> | undefined;
  fileId: any;
  username: any;

  constructor(private fileService: FileService, private authService: AuthService, private userService: UserService, private storage: AngularFireStorage) {
    this.fileService.readAll().subscribe(files => {
      this.dataSource = files;
    });
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

  showDetails(id: string) {
    this.fileId = id;
  }

  downloadFile(name: string) {
    let storageRef = this.storage.storage.ref().child(`uploads/${name}`);
    storageRef.getDownloadURL().then(function(url) {
      window.open(url);
    }).catch(function(_) { });
  }
}
