import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { putToClipboard } from 'src/app/core/utils/dom.utils';
import { SearchStoreService } from 'src/app/search/services/store.service';
import { APP_FILTERS_MAP_BY_PARAM_NAME } from 'src/app/search/store/filters-list';
import { FilterParamValue, ProteinColumn } from 'src/app/search/typings/table';
import { Destroyer } from 'src/app/shared/abstract/destroyer';

@Component({
  selector: 'crng-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent extends Destroyer {
  readonly filtersMap = APP_FILTERS_MAP_BY_PARAM_NAME;
  readonly shareUrl$: Observable<string>;

  constructor(
    private router: Router, //
    private route: ActivatedRoute,
    public readonly store: SearchStoreService,
  ) {
    super();
    this.shareUrl$ = this.store.shareViewParams().pipe(
      takeUntil(this.destroy$),
      map((shareId) => {
        const tree = this.router.createUrlTree(['.'], { queryParams: { shareId }, relativeTo: this.route });
        const { protocol, host } = window.location;
        const url = `${protocol}//${host}${tree.toString()}`;
        return url;
      }),
    );
  }

  updateSearchTerm(value: string) {
    this.applyFilterParam('term', value);
    this.router.navigate(['.'], { queryParams: { term: value }, relativeTo: this.route });
  }

  applyFilterParam(key: string, value: FilterParamValue) {
    this.store.mergeFilters({ [key]: value });
  }

  applyTableColumns(columns: readonly ProteinColumn[]) {
    this.store.setTableColumns(columns);
  }

  shareView() {
    this.store
      .shareViewParams()
      .pipe(takeUntil(this.destroy$))
      .subscribe((shareId) => {
        const tree = this.router.createUrlTree(['.'], { queryParams: { shareId }, relativeTo: this.route });
        const { protocol, host } = window.location;
        const url = `${protocol}//${host}${tree.toString()}`;
        putToClipboard(url);
      });
  }

  identify(index: number, item?: string): string | number {
    return item || index;
  }
}
