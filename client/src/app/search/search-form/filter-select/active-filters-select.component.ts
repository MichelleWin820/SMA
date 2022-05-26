import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { StringAnyMap } from 'src/app/core/typings/common';
import { APP_FILTERS_LIST } from 'src/app/search/store/filters-list';
import { AppFilter } from 'src/app/search/typings/table';
import { BaseMultiSelectComponent } from 'src/app/shared/multi-select/multi-select.component';

export type ItemsType = any[] | StringAnyMap;
export type DataSourceFn = (_: string) => Observable<ItemsType>;
export type DataSource = Observable<ItemsType> | DataSourceFn | null;

@Component({
  selector: 'crng-active-filters-select',
  templateUrl: './active-filters-select.component.html',
  styleUrls: ['./active-filters-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActiveFiltersSelectComponent extends BaseMultiSelectComponent {
  items: readonly AppFilter[] = APP_FILTERS_LIST;

  constructor(changeDetectorRef: ChangeDetectorRef) {
    super(changeDetectorRef);
    this.idFieldName = 'filterParamName';
  }
}
