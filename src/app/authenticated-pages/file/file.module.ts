import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileRoutingModule } from './file-routing.module';
import { FileComponent } from './file.component';
import { MatTabsModule } from "@angular/material/tabs";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatRadioModule } from "@angular/material/radio";
import { ReactiveFormsModule } from "@angular/forms";
import { MatListModule } from "@angular/material/list";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatIconModule } from "@angular/material/icon";


@NgModule({
  declarations: [
      FileComponent
  ],
  exports: [
    FileComponent,
    FileComponent,
    FileComponent
  ],
  imports: [
    CommonModule,
    FileRoutingModule,
    MatTabsModule,
    MatButtonModule,
    MatInputModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatListModule,
    FlexLayoutModule,
    MatIconModule
  ]
})
export class FileModule { }
