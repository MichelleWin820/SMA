import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, forwardRef, HostBinding, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith, switchMap } from 'rxjs/operators';
import { ListRequest, StringAnyMap, StringStringMap } from 'src/app/core/typings/common';
import { BaseMultiSelectComponent } from 'src/app/shared/multi-select/multi-select.component';

export type ItemsType = any[] | StringAnyMap;
export type DataSourceFn = (req?: ListRequest) => Observable<ItemsType>;
export type DataSource = Observable<ItemsType> | DataSourceFn | null;

@Component({
  selector: 'crng-filter-select',
  templateUrl: './filter-select.component.html',
  styleUrls: ['./filter-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FilterSelectComponent),
      multi: true,
    },
  ],
})
export class FilterSelectComponent extends BaseMultiSelectComponent implements OnInit, OnDestroy {
  @Input() buttonText: StringStringMap = {};
  @Input() dataSource?: DataSource;

  @Output() apply = new EventEmitter<readonly string[]>();

  private isApplied = false;

  constructor(changeDetectorRef: ChangeDetectorRef) {
    super(changeDetectorRef);
  }

  @HostBinding('class.active')
  get isAnySelect() {
    return this.selectedSet.size > 0;
  }

  ngOnInit() {
    if (this.dataSource) {
      this.setItems([], this.selectedIds);

      this.filteredItems = this.searchControl.valueChanges.pipe(
        startWith(void 0),
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((searchText) => this.filterSource(searchText)),
      );
    }
  }

  ngOnDestroy() {
    this.dataSource = null;
  }

  clearSelected(e: MouseEvent) {
    e.stopPropagation();
    this.selectedSet.clear();
  }

  clearAndApply(e: MouseEvent) {
    e.stopPropagation();
    this.selectedSet.clear();
    this.applyFilters();
  }

  applyFilters() {
    this.isApplied = true;
    this.selectedIds = Array.from(this.selectedSet.keys());

    this.apply.next(this.selectedIds);
    this.onChange(this.selectedIds);
  }

  clickOnItem(item: any, event?: MouseEvent) {
    event?.stopPropagation();
    this.changeSelectedItems(item);
  }

  onMenuOpened() {
    super.onMenuOpened();
    this.isApplied = false;
  }

  onMenuClosed() {
    super.onMenuClosed();

    if (!this.isApplied) {
      this.setSelectedSet();
    }
  }

  protected setItems(items: readonly any[] | StringAnyMap, selectedIds: readonly string[]) {
    this.items = items;
    this.selectedIds = selectedIds;
    this.setSelectedSet();
  }

  protected filterSource(search?: string): Observable<any[]> {
    if (typeof this.dataSource === 'function') {
      return this.dataSource(search ? { search } : void 0).pipe(
        map((items) => {
          this.setItems(items, this.selectedIds);
          return this.prioritizeItems(Array.isArray(items) ? items : Object.values(items));
        }),
      );
    }

    const obs: Observable<ItemsType> = this.dataSource instanceof Observable ? this.dataSource : of([]);
    return obs.pipe(
      map((items) => {
        this.setItems(items, this.selectedIds);
        return this.prioritizeItems(this.filterItems(search));
      }),
    );
  }
}
