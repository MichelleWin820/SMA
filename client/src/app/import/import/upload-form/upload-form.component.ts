import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ImportParams } from 'src/app/import/services/imports.service';

export type SplitItem = {
  readonly label: string;
  readonly id: string;
};

const DELIMETERS: readonly SplitItem[] = [
  { id: ';', label: ';' },
  { id: ',', label: ',' },
  { id: '\t', label: '⇥' },
  { id: '|', label: '|' },
] as const;

const ESCAPES: readonly SplitItem[] = [
  { id: '"', label: '"' },
  { id: '""', label: '""' },
  { id: '', label: 'none' },
] as const;

@Component({
  selector: 'crng-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.scss'],
})
export class UploadFormComponent {
  @Input() disabled = false;
  @Output() done = new EventEmitter<ImportParams>();
  @Output() sample = new EventEmitter<void>();

  readonly escapes = ESCAPES;
  readonly delimiters = DELIMETERS;

  readonly form = new FormGroup({
    file: new FormControl(void 0, { validators: Validators.required }),
    escape: new FormControl(ESCAPES[0].id),
    delimiter: new FormControl(DELIMETERS[0].id),
  });

  constructor() {}

  downloadSample(e: MouseEvent) {
    e.preventDefault();
    this.sample.next();
  }

  start() {
    if (this.form.invalid) return;
    this.done.next(this.form.value);
  }
}
