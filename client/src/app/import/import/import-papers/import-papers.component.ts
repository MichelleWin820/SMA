import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { AppError } from 'src/app/core/typings/common';
import { ImportState } from 'src/app/import/services/imports.service';
import { LogMessage } from 'src/app/import/typings/upload';

@Component({
  selector: 'crng-import-papers',
  templateUrl: './import-papers.component.html',
  styleUrls: ['./import-papers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImportPapersComponent {
  @Input() state: ImportState = {};
  @Input() error?: AppError;
  @Input() logs: readonly LogMessage[] = [];
  @Output() startImport = new EventEmitter<void>();

  constructor() {}
}
