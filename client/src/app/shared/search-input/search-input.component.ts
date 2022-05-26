import { ChangeDetectionStrategy, Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'crng-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchInputComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchInputComponent implements ControlValueAccessor {
  @Input() value = '';
  @Input() placeholder = 'Search';
  @Input() maxlength?: number;

  @Output() clear = new EventEmitter<void>();
  @Output() edit = new EventEmitter<string>();
  @Output() enter = new EventEmitter<string>();
  @Output() blured = new EventEmitter<string>();

  disabled = false;

  onTouched = () => {};
  onChange = (_: string) => {};

  constructor() {}

  onKeyEnter(el: HTMLInputElement): void {
    el?.blur?.();
    this.write(el.value);
    this.enter.next(this.value);
  }

  clearClick(): void {
    this.write('');
    this.clear.next();
  }

  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: (_: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  write(value: string): void {
    this.value = value;

    this.onTouched();
    this.onChange(value);
    this.edit.next(value);
  }
}
