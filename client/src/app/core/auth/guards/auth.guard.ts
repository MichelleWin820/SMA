import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { AuthStoreService } from 'src/app/core/auth/services/store.service';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authStore: AuthStoreService, private router: Router) {}

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> {
    const fullPath = segments.reduce((path, currentSegment) => `${path}/${currentSegment.path}`, '');
    return this.checkAuth(fullPath);
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.checkAuth(state.url);
  }

  private checkAuth(backUrl?: string): Observable<boolean | UrlTree> {
    return this.authStore.isAuthenticated$.pipe(
      take(1),
      switchMap((isAuthenticated) => {
        if (isAuthenticated) return of(true);

        return this.authStore.checkSession();
      }),
      map((isSessionOk) => {
        if (isSessionOk) return true;

        const urlTree = this.router.parseUrl('/auth/signin');
        if (backUrl) urlTree.queryParams = { back: backUrl };
        return urlTree;
      }),
    );
  }
}
