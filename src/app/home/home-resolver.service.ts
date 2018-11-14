import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { delay, filter, take } from 'rxjs/operators';
import { State, UserTagsActions, UserTagsSelectors } from '../root-store';

@Injectable({
  providedIn: 'root',
})
export class HomeResolverService implements Resolve<boolean> {
  constructor(private store: Store<State>) {}

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    this.store.dispatch(new UserTagsActions.LoadUserTags());
    // todo add current account loading

    return this.store.pipe(
      select(UserTagsSelectors.getIsLoading),
      filter(loading => loading === false),
      delay(500),
      take(1),
    );
  }
}
