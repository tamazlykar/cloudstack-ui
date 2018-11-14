import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { authSelectors } from '../../auth';
import { State } from '../../root-store';
import { RouterUtilsService } from './router-utils.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private routerUtilsService: RouterUtilsService,
    private store: Store<State>,
  ) {}

  public canActivate(_, state: RouterStateSnapshot): Observable<boolean> {
    return this.store.pipe(
      select(authSelectors.getIsLoggedIn),
      map(result => {
        if (!result) {
          this.router.navigate(
            ['/logout'],
            this.routerUtilsService.getRedirectionQueryParams(state.url),
          );
        }
        return result;
      }),
    );
  }
}
