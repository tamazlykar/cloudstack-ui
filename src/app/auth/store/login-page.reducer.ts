import { AuthActionsUnion, AuthActionTypes } from './auth.actions';

export const loginPageStoreName = 'loginPage';

export interface LoginPageState {
  pending: boolean;
  error: string | null;
}

export const initialState: LoginPageState = {
  pending: false,
  error: null,
};

export function loginPageReducer(state = initialState, action: AuthActionsUnion): LoginPageState {
  switch (action.type) {
    case AuthActionTypes.Login: {
      return { ...state, pending: true };
    }

    case AuthActionTypes.LoginSuccess: {
      return initialState;
    }

    case AuthActionTypes.LoginFailure: {
      return {
        ...state,
        error: action.payload.error.message, // todo error
        pending: false,
      };
    }

    default: {
      return state;
    }
  }
}
