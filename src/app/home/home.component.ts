import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, takeUntil, withLatestFrom } from 'rxjs/operators';

import { State, UserTagsActions, layoutStore } from '../root-store';
import { authSelectors } from '../auth';
import { AuthService } from '../auth/auth.service';
import { AccountUser } from '../shared/models';
import { WithUnsubscribe } from '../utils/mixins/with-unsubscribe';
import { Route, Subroute } from '../core/nav-menu/models';
import { getCurrentRoute, getRoutes, getSubroutes } from '../core/nav-menu/redux/nav-menu.reducers';
import * as authActions from '../reducers/auth/redux/auth.actions';

@Component({
  selector: 'cs-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent extends WithUnsubscribe() implements OnInit {
  public disableSecurityGroups = false;
  public routes$: Observable<Route[]> = this.store.pipe(select(getRoutes));
  public currentRoute$: Observable<Route> = this.store.pipe(select(getCurrentRoute));
  public subroutes$: Observable<Subroute[]> = this.store.pipe(select(getSubroutes));
  public showAppNav$: Observable<boolean> = this.store.pipe(
    select(layoutStore.selectors.getShowAppNav),
  );
  // todo change for username from store
  public username$ = 'test';

  constructor(private auth: AuthService, private store: Store<State>) {
    super();
  }

  public ngOnInit(): void {
    // this.store.dispatch(new UserTagsActions.LoadUserTags());

    this.store
      .pipe(
        select(authSelectors.getIsLoggedIn),
        takeUntil(this.unsubscribe$),
        filter(Boolean),
        withLatestFrom(
          this.store.pipe(select(authSelectors.getAccountName)),
          this.store.pipe(select(authSelectors.getDomainId)),
        ),
      )
      .subscribe(([isLoggedIn, accountName, domainId]) => {
        this.store.dispatch(
          new authActions.LoadUserAccountRequest({
            name: accountName,
            domainid: domainId,
          }),
        );
        this.disableSecurityGroups = this.auth.isSecurityGroupEnabled();
      });
  }

  public openAppNav() {
    this.store.dispatch(new layoutStore.actions.OpenAppNav());
  }

  public closeAppNav() {
    this.store.dispatch(new layoutStore.actions.CloseAppNav());
  }
}
