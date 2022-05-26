import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'crng-upload-button',
  templateUrl: './upload-button.component.html',
  styleUrls: ['./upload-button.component.scss'],
})
export class UploadButtonComponent {
  @Input() accept: string = '.csv';
  @Output() fileSelect = new EventEmitter<File>();

  constructor() {}

  onFileInput(element: HTMLInputElement) {
    const files = element.files;
    if (!files || files.length === 0) return;

    this.fileSelect.next(files[0]);
    element.value = '';
  }
}
