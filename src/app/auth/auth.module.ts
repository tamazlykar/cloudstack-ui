import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from '../material/material.module';

import { SharedModule } from '../shared/shared.module';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { LoginPageComponent } from './containers/login-page/login-page.component';

import { LoginComponent } from './login.component';
import { LogoutComponent } from './logout.component';
import { AuthEffects } from './store/auth.effects';
import { authMetaReducers } from './store/auth.meta-reducers';
import { authReducer, authStoreName, initialState } from './store/auth.reducer';
import { loginPageReducer, loginPageStoreName } from './store/login-page.reducer';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    StoreModule.forFeature(authStoreName, authReducer, {
      initialState,
      metaReducers: authMetaReducers,
    }),
    StoreModule.forFeature(loginPageStoreName, loginPageReducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
  declarations: [LoginComponent, LogoutComponent, LoginPageComponent, LoginFormComponent],
})
export class AuthModule {}
