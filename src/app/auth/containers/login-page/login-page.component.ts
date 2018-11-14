import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { State, configSelectors } from '../../../root-store';
import { authActions } from '../../store';
import { Authenticate } from '../../models/authenticate.model';

@Component({
  selector: 'cs-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  public predefinedDomain$ = this.store.pipe(select(configSelectors.get('defaultDomain')));

  constructor(private store: Store<State>) {}

  ngOnInit() {}

  onLogin(credentials: Authenticate) {
    this.store.dispatch(new authActions.Login(credentials));
  }
}
