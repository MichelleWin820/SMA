import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatMenuTrigger } from '@angular/material/menu';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map, startWith } from 'rxjs/operators';
import { StringAnyMap } from 'src/app/core/typings/common';
import { getSortByString } from 'src/app/core/utils/sort-utils';

type SortPriority = { selected: any[]; other: any[] };

@Component({
  template: '',
})
export abstract class BaseMultiSelectComponent implements OnChanges, ControlValueAccessor {
  @Input() items: readonly any[] | Readonly<StringAnyMap> = [];
  @Input() idFieldName = '';
  @Input() labelFieldName = '';
  @Input() alternativeLabelFieldName: string = '';
  @Input() selectedIds: readonly string[] = [];
  @Input() searchVisibleCount = 10;
  @Input() disabled = false;
  @Input() disableRipple = false;
  @Input() searchPlaceholder = 'Search';
  @Input() mode: 'single' | 'multi' = 'multi';

  @Output() opened = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();
  @Output() selectItem = new EventEmitter<any>();
  @Output() unselectItem = new EventEmitter<any>();

  @ViewChild('searchInput') searchInput?: ElementRef;
  @ViewChild('menuTrigger') menuTrigger?: MatMenuTrigger;

  itemsCount = 0;
  selectedText = '';
  filteredItems: Observable<readonly any[]>;
  selectedSet = new Set<string>();

  searchControl = new FormControl();

  protected onTouched: () => void = () => {};
  protected onChange: (_: any) => void = (_) => {};

  constructor(protected changeDetectorRef: ChangeDetectorRef) {
    this.filteredItems = this.searchControl.valueChanges.pipe(
      startWith(null),
      distinctUntilChanged(),
      map((searchText) => this.prioritizeItems(this.filterItems(searchText))),
    );
  }

  get hasSearch(): boolean {
    return this.itemsCount >= this.searchVisibleCount;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.items) {
      this.setItemsCount();
    }

    if (changes.selectedIds) {
      this.setSelectedSet();
    }
  }

  identify(index: number, item: any): string | number {
    return item?.[this.idFieldName] || index;
  }

  clickOnItem(item: any, event?: MouseEvent) {
    event?.preventDefault();
    event?.stopPropagation();

    if (this.mode === 'multi') {
      this.changeSelectedItems(item);
      this.onChange(Array.from(this.selectedSet.keys()));
    } else {
      this.menuTrigger?.closeMenu();
      this.changeSelectedItem(item);
      this.onChange(Array.from(this.selectedSet.keys())[0]);
    }
  }

  onMenuOpened() {
    this.onTouched();
    this.opened.next();
  }

  onMenuClosed() {
    this.searchControl.setValue('');
    this.closed.next();
  }

  writeValue(value: any): void {
    this.selectedIds = value || [];
    this.setSelectedSet();
  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  protected filterItems(search?: string) {
    const items = this.getItemsAsArray();
    if (!search) return items;

    const text = search.toLowerCase();
    return items.filter((i) => {
      const val = i[this.labelFieldName] || i[this.alternativeLabelFieldName] || '';
      return val.toLowerCase().includes(text);
    });
  }

  protected setItems(items: any[] | StringAnyMap, selectedIds: readonly string[]) {
    this.items = items;
    this.selectedIds = selectedIds || [];
    this.setItemsCount();
    this.setSelectedSet();
  }

  protected setSelectedSet() {
    this.selectedSet = new Set(this.selectedIds);
  }

  protected setItemsCount() {
    const items = this.items;
    this.itemsCount = items ? (Array.isArray(items) ? items.length : Object.keys(items).length) : 0;
  }

  protected changeSelectedItems(item: any) {
    const itemId = item[this.idFieldName];

    if (!this.selectedSet.has(itemId)) {
      this.selectedSet.add(itemId);
      this.selectItem.next(item);
    } else {
      this.selectedSet.delete(itemId);
      this.unselectItem.next(item);
    }
  }

  protected changeSelectedItem(item: any) {
    const itemId = item[this.idFieldName];

    this.selectedSet.clear();
    this.selectedSet.add(itemId);
    this.selectItem.next(item);
  }

  protected prioritizeItems(items: any[]): any[] {
    if (this.mode === 'single') return items;

    let res: SortPriority;

    if (this.selectedSet.size === 0) {
      res = { selected: [], other: items };
    } else {
      res = items.reduce(
        (acc: SortPriority, item) => {
          if (this.selectedSet.has(item[this.idFieldName])) {
            acc.selected.push(item);
          } else {
            acc.other.push(item);
          }
          return acc;
        },
        { selected: [], other: [] } as SortPriority,
      );
    }

    const sortFn = getSortByString(this.labelFieldName);
    return res.selected.sort(sortFn).concat(res.other);
  }

  protected getItemsAsArray() {
    return Array.isArray(this.items) ? this.items : typeof this.items === 'object' && this.items !== null ? Object.values(this.items) : [];
  }

  protected getSelectedValues() {
    return this.getItemsAsArray().filter((item) => this.selectedSet.has(item[this.idFieldName]));
  }
}

@Component({
  selector: 'crng-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiSelectComponent),
      multi: true,
    },
  ],
})
export class MultiSelectComponent extends BaseMultiSelectComponent {
  constructor(protected changeDetectorRef: ChangeDetectorRef) {
    super(changeDetectorRef);
  }
}
