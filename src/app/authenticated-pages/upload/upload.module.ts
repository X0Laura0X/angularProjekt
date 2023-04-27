import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadRoutingModule } from './upload-routing.module';
import { UploadComponent } from './upload.component';
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { MatInputModule } from "@angular/material/input";
import { MatRadioModule } from "@angular/material/radio";
import { MatIconModule } from "@angular/material/icon";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatTableModule } from "@angular/material/table";
import { FileModule } from "../file/file.module";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { PercentageFormatPipe } from "../../common/pipes/percentage-format.pipe";
import { FlexLayoutModule } from "@angular/flex-layout";


@NgModule({
  declarations: [
    UploadComponent,
    PercentageFormatPipe
  ],
  imports: [
      CommonModule,
      UploadRoutingModule,
      MatButtonModule,
      MatCardModule,
      MatDividerModule,
      MatInputModule,
      MatRadioModule,
      MatIconModule,
      ReactiveFormsModule,
      MatTableModule,
      FormsModule,
      FileModule,
      MatProgressBarModule,
      FlexLayoutModule
  ]
})
export class UploadModule { }
