import { LoginUser } from '../models/login-user.model';
import { AuthActionsUnion, AuthActionTypes } from './auth.actions';

export const authStoreName = 'auth';

export interface AuthState {
  accountName: string | undefined;
  userId: string | undefined;
  domainId: string | undefined;
  sessionKey: string | undefined;
}

export const initialState: AuthState = {
  accountName: undefined,
  userId: undefined,
  domainId: undefined,
  sessionKey: undefined,
};

export function authReducer(state = initialState, action: AuthActionsUnion) {
  switch (action.type) {
    case AuthActionTypes.LoginSuccess: {
      const user: LoginUser = action.payload.user;
      return {
        ...state,
        accountName: user.account,
        userId: user.userid,
        domainId: user.domainid,
        sessionKey: user.sessionkey,
      };
    }

    case AuthActionTypes.Logout: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}
