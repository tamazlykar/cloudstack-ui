import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterReducerState } from '@ngrx/router-store';

import { RouterStateUrl } from '../custom-router-state-serializer';

const getRouterState = createFeatureSelector<RouterReducerState<RouterStateUrl>>('router');

export const getUrl = createSelector(getRouterState, state => state && state.state.url);

export const getQueryParams = createSelector(
  getRouterState,
  state => state && state.state.queryParams,
);
