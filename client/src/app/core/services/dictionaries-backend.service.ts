import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ListRequest } from 'src/app/core/typings/common';
import { Domain } from 'src/app/core/typings/domain';
import { Gene } from 'src/app/core/typings/gene';
import { Method } from 'src/app/core/typings/method';
import { Pathway } from 'src/app/core/typings/pathway';
import { Reaction } from 'src/app/core/typings/reaction';
import { parseHttpError } from 'src/app/core/utils/parse-http-error';

@Injectable()
export class DictionariesBackendService {
  constructor(private readonly http: HttpClient) {}

  getGenes(params?: ListRequest): Observable<readonly Gene[]> {
    return this.http.get('/api/genes/', { params }).pipe(
      map((res: any) => {
        return res.list;
      }),
      catchError((res: HttpErrorResponse): never => {
        throw parseHttpError(res);
      }),
    );
  }

  getDomains(params?: ListRequest): Observable<readonly Domain[]> {
    return this.http.get('/api/domains/', { params }).pipe(
      map((res: any) => {
        return res.list;
      }),
      catchError((res: HttpErrorResponse): never => {
        throw parseHttpError(res);
      }),
    );
  }

  getMethods(params?: ListRequest): Observable<readonly Method[]> {
    return this.http.get('/api/methods/', { params }).pipe(
      map((res: any) => {
        return res.list;
      }),
      catchError((res: HttpErrorResponse): never => {
        throw parseHttpError(res);
      }),
    );
  }

  getReactions(params?: ListRequest): Observable<readonly Reaction[]> {
    return this.http.get('/api/reactions/', { params }).pipe(
      map((res: any) => {
        return res.list;
      }),
      catchError((res: HttpErrorResponse): never => {
        throw parseHttpError(res);
      }),
    );
  }

  getPathways(params?: ListRequest): Observable<readonly Pathway[]> {
    return this.http.get('/api/pathways/', { params }).pipe(
      map((res: any) => {
        return res.list;
      }),
      catchError((res: HttpErrorResponse): never => {
        throw parseHttpError(res);
      }),
    );
  }
}
