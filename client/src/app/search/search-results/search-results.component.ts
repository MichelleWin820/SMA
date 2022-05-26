import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, SortDirection } from '@angular/material/sort';
import { debounceTime, distinctUntilChanged, filter, map, switchMap, take, takeUntil } from 'rxjs/operators';
import { Protein } from 'src/app/core/typings/protein';
import { ProteinsDataSource } from 'src/app/search/search-results/data-source';
import { SelectService } from 'src/app/search/search-results/select.service';
import { SearchStoreService } from 'src/app/search/services/store.service';
import { TABLE_COLUMNS_MAP_BY_ID } from 'src/app/search/store/columns-list';
import { ProteinColumn } from 'src/app/search/typings/table';
import { Destroyer } from 'src/app/shared/abstract/destroyer';

@Component({
  selector: 'crng-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
  providers: [SelectService],
})
export class SearchResultsComponent extends Destroyer implements AfterViewInit, OnInit {
  allColumns: readonly string[] = ['select'];
  displayedColumns: readonly ProteinColumn[] = [];
  matSortActive: ProteinColumn = 'name';
  matSortDirection: SortDirection = 'asc';
  readonly columnsMap = TABLE_COLUMNS_MAP_BY_ID;
  readonly dataSource: ProteinsDataSource;

  @ViewChild(MatSort) sort?: MatSort;

  constructor(
    public readonly selServ: SelectService,
    private readonly store: SearchStoreService, //
  ) {
    super();
    this.dataSource = new ProteinsDataSource(this.store);
  }

  ngOnInit() {
    this.store.viewParams$
      .pipe(
        switchMap((vp) => this.store.loadProteins(vp)),
        takeUntil(this.destroy$),
      )
      .subscribe();

    this.store.filters$
      .pipe(
        take(1),
        map(({ sort }) => sort),
        filter((sort): sort is string => typeof sort === 'string'),
      )
      .subscribe((sort) => {
        this.matSortDirection = sort[0] === '-' ? 'desc' : 'asc';
        this.matSortActive = sort.replace('-', '') as ProteinColumn;
      });

    this.store.columns$.pipe(takeUntil(this.destroy$)).subscribe((columns) => {
      this.displayedColumns = [...columns];
      this.allColumns = ['select', ...columns];
    });
  }

  ngAfterViewInit(): void {
    this.sort?.sortChange
      .pipe(
        debounceTime(300), //
        distinctUntilChanged(),
        takeUntil(this.destroy$),
      )
      .subscribe(() => {
        const sortCol = this.sort?.active || 'name';
        const sortDir = this.sort?.direction === 'desc' ? '-' : '';
        const sort = sortDir + sortCol;
        this.store.mergeFilters({ sort, skip: 0 });
      });
  }

  checkOne(protein: Protein, event: MouseEvent) {
    event.preventDefault();
    this.selServ.oneCheck(protein, event.shiftKey);
  }

  dropColumn(event: CdkDragDrop<ProteinColumn[]>) {
    const columns = [...this.displayedColumns];
    moveItemInArray(columns, event.previousIndex, event.currentIndex);
    this.store.setTableColumns(columns);
  }
}
