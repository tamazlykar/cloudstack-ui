import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { authSelectors } from '../../auth/store';
import { State } from '../../root-store';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private router: Router, private store: Store<State>) {}
  // todo maybe need to delete
  public canActivate(): Observable<boolean> {
    return this.store.pipe(
      select(authSelectors.getIsLoggedIn),
      map(result => {
        if (result) {
          this.router.navigate(['/instances']);
        }
        return !result;
      }),
    );
  }
}
