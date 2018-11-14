import { Action } from '@ngrx/store';
import { Authenticate } from '../models/authenticate.model';
import { LoginUser } from '../models/login-user.model';

export enum AuthActionTypes {
  Login = '[Login Page] Login',
  LoginSuccess = '[Auth API] Login Success',
  LoginFailure = '[Auth API] Login Failure',
  Logout = '[Auth] Logout',
  IdleLogout = '[Idle monitor] Logout',
  LogoutComplete = '[Auth API] Logout complete',
}

export class Login implements Action {
  readonly type = AuthActionTypes.Login;

  constructor(public payload: Authenticate) {}
}

export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LoginSuccess;

  constructor(public payload: { user: LoginUser }) {} // todo
}

export class LoginFailure implements Action {
  readonly type = AuthActionTypes.LoginFailure;

  constructor(public payload: { error: Error }) {} // todo
}

export class Logout implements Action {
  readonly type = AuthActionTypes.Logout;
}

export class IdleLogout implements Action {
  readonly type = AuthActionTypes.IdleLogout;
}

export class LogoutComplete implements Action {
  readonly type = AuthActionTypes.LogoutComplete;
}

export type AuthActionsUnion =
  | Login
  | LoginSuccess
  | LoginFailure
  | Logout
  | IdleLogout
  | LogoutComplete;
