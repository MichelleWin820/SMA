import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthBackendService } from 'src/app/core/auth/services/auth-backend.service';
import { checkToken, checkTokenSuccess, signin, signinError, signinSuccess } from 'src/app/core/auth/store/actions';
import { selectUserSelector } from 'src/app/core/auth/store/selectors';
import { AuthUser, SingInReq } from 'src/app/core/typings/auth';
import { AppError } from 'src/app/core/typings/common';

@Injectable()
export class AuthStoreService {
  readonly user$: Observable<AuthUser | undefined>;
  readonly isAuthenticated$: Observable<boolean>;

  constructor(
    private readonly store: Store, //
    private readonly abs: AuthBackendService,
  ) {
    this.user$ = store.select(selectUserSelector);
    this.isAuthenticated$ = store.select(selectUserSelector).pipe(map((user) => !!user));
  }

  signIn(req: SingInReq): Observable<AuthUser> {
    this.store.dispatch(signin({ req }));

    return this.abs.signIn(req).pipe(
      map((user) => {
        this.store.dispatch(signinSuccess({ user }));
        return user;
      }),
      catchError((error: AppError) => {
        this.store.dispatch(signinError({ error }));
        return throwError(error);
      }),
    );
  }

  checkSession(): Observable<boolean> {
    this.store.dispatch(checkToken());

    return this.abs.checkSession().pipe(
      map((user) => {
        this.store.dispatch(checkTokenSuccess({ user }));
        return true;
      }),
      catchError(() => {
        return of(false);
      }),
    );
  }
}
