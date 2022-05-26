import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { ImportRoutingModule } from 'src/app/import/import-routing.module';
import { ImportFormComponent } from 'src/app/import/import/import-form/import-form.component';
import { ImportPapersComponent } from 'src/app/import/import/import-papers/import-papers.component';
import { ImportsService } from 'src/app/import/services/imports.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { ImportComponent } from './import/import.component';
import { UploadButtonComponent } from './import/upload-button/upload-button.component';
import { UploadFormComponent } from './import/upload-form/upload-form.component';

@NgModule({
  declarations: [
    ImportComponent, //
    ImportFormComponent,
    ImportPapersComponent,
    UploadFormComponent,
    UploadButtonComponent,
  ],
  imports: [
    CommonModule, //
    MatTabsModule,
    MatButtonModule,
    MatButtonToggleModule,
    ScrollingModule,
    ReactiveFormsModule,
    SharedModule,
    MatProgressBarModule,
    ImportRoutingModule,
  ],
  providers: [ImportsService],
})
export class ImportModule {}
