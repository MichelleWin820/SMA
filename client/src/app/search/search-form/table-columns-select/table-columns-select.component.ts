import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { distinctUntilChanged, map, Observable, startWith } from 'rxjs';
import { StringAnyMap } from 'src/app/core/typings/common';
import { DEFAULT_TABLE_COLUMNS, TABLE_COLUMNS_LIST } from 'src/app/search/store/columns-list';
import { ProteinColumn, TableColumn } from 'src/app/search/typings/table';
import { BaseMultiSelectComponent } from 'src/app/shared/multi-select/multi-select.component';

export type ItemsType = any[] | StringAnyMap;
export type DataSourceFn = (_: string) => Observable<ItemsType>;
export type DataSource = Observable<ItemsType> | DataSourceFn | null;

@Component({
  selector: 'crng-table-columns-select',
  templateUrl: './table-columns-select.component.html',
  styleUrls: ['./table-columns-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableColumnsSelectComponent extends BaseMultiSelectComponent implements OnInit {
  @Output() apply = new EventEmitter<readonly ProteinColumn[]>();

  items: readonly TableColumn[] = TABLE_COLUMNS_LIST;
  private isApplied = false;

  constructor(changeDetectorRef: ChangeDetectorRef) {
    super(changeDetectorRef);
    this.idFieldName = 'id';
  }

  ngOnInit() {
    this.filteredItems = this.searchControl.valueChanges.pipe(
      startWith(void 0),
      distinctUntilChanged(),
      map((searchText) => this.filterSource(searchText)),
    );
  }

  clickOnItem(item: any) {
    this.changeSelectedItems(item);
  }

  applyDefault() {
    this.setItems(this.items, DEFAULT_TABLE_COLUMNS);
    this.applyColumns();
  }

  applySelected() {
    this.setItems(this.items, Array.from(this.selectedSet.keys()));
    this.applyColumns();
  }

  applyColumns() {
    this.isApplied = true;
    this.apply.next(this.selectedIds as readonly ProteinColumn[]);
    this.onChange(this.selectedIds);
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

  protected filterSource(search?: string): readonly TableColumn[] {
    const text = search?.toLocaleLowerCase() || '';
    if (!text) return this.items;

    return this.items.filter(
      (c) =>
        c.id.toLocaleLowerCase().includes(text) || //
        c.friendlyName.toLocaleLowerCase().includes(text) ||
        c.dropdownItemName.toLocaleLowerCase().includes(text),
    );
  }
}
