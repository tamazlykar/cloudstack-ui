import { ActionReducer, MetaReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { initialState } from './auth.reducer';

function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({ keys: Object.keys(initialState), rehydrate: true })(reducer);
}

export const authMetaReducers: MetaReducer<any, any>[] = [localStorageSyncReducer];
