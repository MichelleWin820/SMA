import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { AppError, StringTMap } from 'src/app/core/typings/common';
import { ImportParams, ImportsService, ImportState } from 'src/app/import/services/imports.service';
import { LogMessage } from 'src/app/import/typings/upload';
import { Destroyer } from 'src/app/shared/abstract/destroyer';

@Component({
  selector: 'crng-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss'],
})
export class ImportComponent extends Destroyer implements OnInit {
  isConnected = false;
  state: StringTMap<ImportState> = {};
  errors: StringTMap<AppError | undefined> = {};
  logs: StringTMap<readonly LogMessage[]> = {};

  constructor(private readonly impService: ImportsService) {
    super();
  }

  ngOnInit() {
    this.impService
      .connect()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.isConnected = true;
      });
  }

  startImport(table: string, params?: ImportParams) {
    this.logs[table] = [];
    this.state[table] = {};
    this.errors[table] = void 0;

    this.impService
      .import(table, params)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (state) => {
          this.state[table] = state;
          this.logs[table] = state.logMsg ? [state.logMsg, ...this.logs[table]] : this.logs[table];
        },
        error: (err: AppError) => {
          this.state[table] = {};
          this.errors[table] = err;
        },
      });
  }

  sendSample(table: string) {
    this.impService.downloadSample(table);
  }
}
