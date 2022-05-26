import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { DictionariesBackendService } from 'src/app/core/services/dictionaries-backend.service';
import { AppError, ListRequest } from 'src/app/core/typings/common';
import { Domain } from 'src/app/core/typings/domain';
import { Gene } from 'src/app/core/typings/gene';
import { Method } from 'src/app/core/typings/method';
import { Pathway } from 'src/app/core/typings/pathway';
import { Protein } from 'src/app/core/typings/protein';
import { Reaction } from 'src/app/core/typings/reaction';
import { SearchBackendService } from 'src/app/search/services/search-backend.service';
import { ViewSettingsBackendService } from 'src/app/search/services/view-params-backend.service';
import {
  addTableColumn,
  delTableColumn,
  loadProteinsList,
  loadProteinsListError,
  loadProteinsListSuccess,
  loadProteinsPage,
  loadProteinsPageError,
  loadProteinsPageSuccess,
  mergeFilters,
  setTableColumns,
  setViewParams
} from 'src/app/search/store/actions';
import { APP_FILTERS_MAP_BY_PARAM_NAME } from 'src/app/search/store/filters-list';
import { selectProteinsSelector, selectProteinsTotalSelector, selectViewColumns, selectViewFilters, selectViewParams } from 'src/app/search/store/selectors';
import { FilterParams, ProteinColumn, ProteinsListResult, ViewParams } from 'src/app/search/typings/table';

@Injectable()
export class SearchStoreService {
  readonly proteins$: Observable<readonly Protein[]>;
  readonly proteinsTotal$: Observable<number>;
  readonly viewParams$: Observable<ViewParams>;
  readonly filters$: Observable<FilterParams>;
  readonly columns$: Observable<readonly ProteinColumn[]>;
  readonly activeFilters$: Observable<readonly string[]>;

  constructor(
    private readonly store: Store, //
    private readonly sbs: SearchBackendService,
    private readonly vbs: ViewSettingsBackendService,
    private readonly dbs: DictionariesBackendService,
  ) {
    this.proteins$ = store.select(selectProteinsSelector);
    this.viewParams$ = store.select(selectViewParams);
    this.filters$ = store.select(selectViewFilters);
    this.columns$ = store.select(selectViewColumns);
    this.proteinsTotal$ = store.select(selectProteinsTotalSelector);

    this.activeFilters$ = this.viewParams$.pipe(
      map(({ filters }) => {
        return Object.keys(filters).reduce((acc, key) => {
          const filter = APP_FILTERS_MAP_BY_PARAM_NAME.get(key);
          if (filter && filters[key]) {
            acc.push(filter.filterParamName);
          }
          return acc;
        }, [] as string[]);
      }),
    );
  }

  setViewParams(params: ViewParams): void {
    this.store.dispatch(setViewParams(params));
  }

  mergeFilters(filters: FilterParams): void {
    this.store.dispatch(mergeFilters({ filters }));
  }

  setTableColumns(columns: readonly ProteinColumn[]): void {
    this.store.dispatch(setTableColumns({ columns }));
  }

  showColumn(column: ProteinColumn): void {
    this.store.dispatch(addTableColumn({ column }));
  }

  hideColumn(column: ProteinColumn): void {
    this.store.dispatch(delTableColumn({ column }));
  }

  shareViewParams(): Observable<string> {
    return this.viewParams$.pipe(
      take(1),
      switchMap((viewParams) => {
        return this.vbs.createShare(viewParams);
      }),
    );
  }

  loadGenes = (req?: ListRequest): Observable<readonly Gene[]> => {
    return this.dbs.getGenes(req);
  };

  loadDomains = (req?: ListRequest): Observable<readonly Domain[]> => {
    return this.dbs.getDomains(req);
  };

  loadMethods = (req?: ListRequest): Observable<readonly Method[]> => {
    return this.dbs.getMethods(req);
  };

  loadReactions = (req?: ListRequest): Observable<readonly Reaction[]> => {
    return this.dbs.getReactions(req);
  };

  loadPathways = (req?: ListRequest): Observable<readonly Pathway[]> => {
    return this.dbs.getPathways(req);
  };

  loadProteins = (viewParams: ViewParams): Observable<ProteinsListResult> => {
    this.store.dispatch(loadProteinsList({ viewParams }));

    return this.sbs.getProteinsList(viewParams).pipe(
      map((result) => {
        this.store.dispatch(loadProteinsListSuccess(result));
        return result;
      }),
      catchError((error: AppError) => {
        this.store.dispatch(loadProteinsListError({ error }));
        return throwError(error);
      }),
    );
  };

  loadProteinsPage = (viewParams: ViewParams): Observable<ProteinsListResult> => {
    this.store.dispatch(loadProteinsPage({ viewParams }));

    return this.sbs.getProteinsList(viewParams).pipe(
      map((result) => {
        this.store.dispatch(loadProteinsPageSuccess(result));
        return result;
      }),
      catchError((error: AppError) => {
        this.store.dispatch(loadProteinsPageError({ error }));
        return throwError(error);
      }),
    );
  };
}
