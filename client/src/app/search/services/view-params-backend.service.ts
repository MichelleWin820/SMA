import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { DEFAULT_TABLE_COLUMNS } from 'src/app/search/store/columns-list';
import { ViewParams } from 'src/app/search/typings/table';

const storageKey = 'crng:view';

@Injectable()
export class ViewSettingsBackendService {
  constructor(private readonly http: HttpClient) {}

  save(viewParams: ViewParams): Observable<void> {
    window.localStorage.setItem(storageKey, JSON.stringify(viewParams));
    return of();
  }

  load(shareId?: string): Observable<ViewParams> {
    if (!shareId) return this.loadLocal();

    return this.http.get(`/api/share/${shareId}`).pipe(
      map((res: any) => res.share),
      catchError(() => this.loadLocal()),
    );
  }

  createShare(viewParams: ViewParams): Observable<string> {
    return this.http.post(`/api/share/`, viewParams).pipe(map((res: any) => res.id));
  }

  private loadLocal(): Observable<ViewParams> {
    const defViewParams: ViewParams = { filters: {}, columns: DEFAULT_TABLE_COLUMNS };

    let result: ViewParams;
    try {
      const value = window.localStorage.getItem(storageKey);
      result = value ? JSON.parse(value) : defViewParams;
    } catch (error) {
      result = defViewParams;
    }

    return of(result);
  }
}
