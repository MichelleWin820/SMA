import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { AppError } from 'src/app/core/typings/common';
import { ImportParams, ImportState } from 'src/app/import/services/imports.service';
import { LogMessage } from 'src/app/import/typings/upload';

@Component({
  selector: 'crng-import-form',
  templateUrl: './import-form.component.html',
  styleUrls: ['./import-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImportFormComponent {
  @Input() state: ImportState = {};
  @Input() error?: AppError;
  @Input() logs: readonly LogMessage[] = [];
  @Output() startImport = new EventEmitter<ImportParams>();
  @Output() downloadSample = new EventEmitter<void>();

  constructor() {}
}
