import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthUser, SingInReq } from 'src/app/core/typings/auth';
import { parseHttpError } from 'src/app/core/utils/parse-http-error';

@Injectable()
export class AuthBackendService {
  constructor(private readonly http: HttpClient) {}

  signIn(req: SingInReq): Observable<AuthUser> {
    return this.http.post('/api/auth/signin', req).pipe(
      map((res: any) => {
        return res.user;
      }),
      catchError((res: HttpErrorResponse): never => {
        throw parseHttpError(res);
      }),
    );
  }

  checkSession(): Observable<AuthUser> {
    return this.http.get('/api/auth/check').pipe(
      map((res: any) => {
        return res.user;
      }),
      catchError((res: HttpErrorResponse): never => {
        throw parseHttpError(res);
      }),
    );
  }
}
