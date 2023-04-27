import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DownloadRoutingModule } from './download-routing.module';
import { DownloadComponent } from './download.component';
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { MatTableModule } from "@angular/material/table";
import { FileModule } from "../file/file.module";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { FlexLayoutModule } from "@angular/flex-layout";


@NgModule({
  declarations: [
    DownloadComponent
  ],
  imports: [
      CommonModule,
      DownloadRoutingModule,
      MatCardModule,
      MatDividerModule,
      MatTableModule,
      FileModule,
      MatButtonModule,
      MatIconModule,
      FlexLayoutModule
  ]
})
export class DownloadModule { }
