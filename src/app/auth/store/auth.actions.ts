import { Action } from '@ngrx/store';

export const TRY_SIGNUP = 'TRY_SIGNUP';
export const TRY_SIGNIN = 'TRY_SIGNIN';
export const SIGNUP = 'SIGNUP';
export const SIGNIN = 'SIGNIN';
export const LOGOUT = 'LOGOUT';
export const SET_TOKEN = 'SET_TOKEN'

export class TrySignup implements Action {
   readonly type = TRY_SIGNUP;

   constructor(public payload: { username: string, password: string }) { }
}

export class TrySignIn implements Action {
   readonly type = TRY_SIGNIN;

   constructor(public payload: { username: string, password: string }) { }
}

export class Signup implements Action {
   readonly type = SIGNUP;
}

export class SignIn implements Action {
   readonly type = SIGNIN;
}

export class LogOut implements Action {
   readonly type = LOGOUT;
}

export class SetToken implements Action {
   readonly type = SET_TOKEN;

   constructor(public payload: string) { }
}

export type AuthActions =
   TrySignup |
   TrySignIn |
   Signup |
   SignIn |
   LogOut |
   SetToken;
