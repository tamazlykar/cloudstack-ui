import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { mergeMap, tap, withLatestFrom, map, exhaustMap, catchError } from 'rxjs/operators';
import { AuthService } from '../auth.service';

import {
  AuthActionTypes,
  IdleLogout,
  Login,
  LoginFailure,
  LoginSuccess,
  LogoutComplete,
} from './auth.actions';
import { RouterUtilsService } from '../../shared/services/router-utils.service';
import {
  configSelectors,
  IdleMonitorActions,
  State,
  UserTagsActions,
  routerSelectors,
} from '../../root-store';

@Injectable()
export class AuthEffects {
  @Effect()
  login$ = this.actions$.pipe(
    ofType<Login>(AuthActionTypes.Login),
    map(action => action.payload),
    exhaustMap(credentials => {
      return this.authService.login2(credentials).pipe(
        map(user => new LoginSuccess({ user })),
        catchError(error => of(new LoginFailure({ error }))),
      );
    }),
  );

  @Effect({ dispatch: false })
  loginRedirect$ = this.actions$.pipe(
    ofType<LoginSuccess>(AuthActionTypes.LoginSuccess),
    withLatestFrom(this.store.pipe(select(routerSelectors.getQueryParams))),
    tap(([action, queryParams]) => {
      const url =
        queryParams['next'] && queryParams['next'] !== '/login' && queryParams['next'] !== 'login'
          ? queryParams['next']
          : '';
      this.router.navigateByUrl(url);
    }),
  );

  @Effect({ dispatch: false })
  idleLogout$: Observable<Action> = this.actions$.pipe(
    ofType<IdleLogout>(AuthActionTypes.IdleLogout),
    tap(() =>
      this.router.navigate(['/logout'], this.routerUtilsService.getRedirectionQueryParams()),
    ),
  );

  @Effect()
  logoutSuccess$: Observable<Action> = this.actions$.pipe(
    ofType<LogoutComplete>(AuthActionTypes.LogoutComplete),
    withLatestFrom(this.store.pipe(select(configSelectors.getDefaultUserTags))),
    mergeMap(([action, tags]) => [
      new IdleMonitorActions.StopIdleMonitor(),
      new UserTagsActions.SetDefaultUserTagsDueToLogout({ tags }),
    ]),
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private routerUtilsService: RouterUtilsService,
    private store: Store<State>,
    private authService: AuthService,
  ) {}
}
