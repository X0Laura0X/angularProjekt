import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { File } from "../../common/model/File";
import { Comment } from "../../common/model/Comment";
import { FormBuilder, Validators } from "@angular/forms";
import { FileService } from "../../common/services/file.service";
import { Brofist } from "../../common/model/Brofist";
import { BrofistService } from "../../common/services/brofist.service";
import { CommentService } from "../../common/services/comment.service";
import { DialogComponent } from "../../common/dialog/dialog.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit, OnChanges{
  @Input() fileId: any;
  @Input() myFiles: any;
  @Input() username: any;

  brofists: Array<Brofist> | undefined;
  comments: Array<Comment> | undefined;
  fileName: any;
  submittedComment: boolean = false;
  submittedFile: boolean = false;
  updateFileForm = this.createFileForm({
    id: '',
    name: '',
    type: 'movie',
    createdAt: '',
    uploader: ''
  });
  commentForm = this.createCommentForm({
    id: '',
    username: '',
    fileId: '',
    text: ''
  });

  constructor(private formBuilder: FormBuilder, private fileService: FileService, private brofistService: BrofistService, private commentService: CommentService, public dialog: MatDialog) { }

  createCommentForm(model: Comment) {
    let commentForm = this.formBuilder.group(model);
    commentForm.get('text')?.addValidators([
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(65),
    ]);
    return commentForm;
  }

  createFileForm(model: File) {
    let fileForm = this.formBuilder.group(model);
    fileForm.get('type')?.addValidators([
      Validators.required,
    ]);
    return fileForm;
  }

  updateFile() {
    this.submittedFile = true;
    if (this.updateFileForm.valid) {
      const file: File = {
        id: this.fileId,
        type: this.updateFileForm.get('type')?.value as string,
      };
      this.fileService.update(file).then(_ => {
        console.log('File updated successfully');
      }).catch(error => {
        console.log(error);
      });
    }
  }

  addBrofist() {
    const brofist: Brofist = {
      username: this.username,
      fileId: this.fileId
    }
    this.brofistService.create(brofist).then(_ => {
      console.log('Brofist added successfully');
    });
  }

  ngOnInit(): void {
    this.brofistService.readAll(this.fileId).subscribe(brofists => {
      if (brofists && brofists.length > 0) {
        this.brofists = brofists;
      }
    });
    this.commentService.readAll(this.fileId).subscribe(comments => {
      if (comments && comments.length > 0) {
        this.comments = comments;
      }
    });
    this.fileService.readFileById(this.fileId).subscribe(files => {
      if (files && files.length > 0) {
        this.fileName = files[0].name;
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.fileId && !this.fileId.firstChange) {
      this.brofistService.readAll(this.fileId).subscribe(brofists => {
        this.brofists = brofists;
      });
      this.commentService.readAll(this.fileId).subscribe(comments => {
        this.comments = comments;
      });
      this.fileService.readFileById(this.fileId).subscribe(files => {
        if (files && files.length > 0) {
          this.fileName = files[0].name;
        }
      });
    }
  }

  deleteBrofist() {
    this.brofistService.delete(this.fileId, this.username);
  }

  createComment() {
    this.submittedComment = true;
    if (this.commentForm.valid) {
      const comment: Comment = {
        username: this.username,
        fileId: this.fileId as string,
        text: this.commentForm.get('text')?.value as string
      };
      this.commentService.create(comment).then(_ => {
        console.log('Comment created successfully');
      }).catch(error => {
        console.log(error);
      });
    }
  }

  deleteComment(id: any) {
    const dialogRef = this.dialog.open(DialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.commentService.delete(id).then(_ => {
          console.log('Comment deleted successfully');
        });
      }
    });
  }
}
