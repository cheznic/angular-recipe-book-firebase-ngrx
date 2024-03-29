import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';

import { from } from 'rxjs';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';
import * as firebase from 'firebase';

import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
   @Effect()
   authSignup = this.actions$.pipe(ofType(AuthActions.TRY_SIGNUP), map(
      (action: AuthActions.TrySignup) => {
         return action.payload;
      }
   )).pipe(switchMap((authData: { username: string, password: string }) => {
      return from(
         firebase.auth()
            .createUserWithEmailAndPassword(authData.username, authData.password));
   })).pipe(switchMap(() => {
      return from(firebase.auth().currentUser.getIdToken());
   })).pipe(mergeMap((token: string) => {
      this.router.navigate(['/']);
      return [
         {
            type: AuthActions.SIGNUP
         },
         {
            type: AuthActions.SET_TOKEN,
            payload: token
         }
      ]
   }));

   @Effect()
   authSignin = this.actions$.pipe(ofType(AuthActions.TRY_SIGNIN), map(
      (action: AuthActions.TrySignIn) => {
         return action.payload;
      }
   )).pipe(switchMap((authData: { username: string, password: string }) => {
      return from(
         firebase.auth()
            .signInWithEmailAndPassword(authData.username, authData.password));
   })).pipe(switchMap(() => {
      return from(firebase.auth().currentUser.getIdToken());
   })).pipe(mergeMap((token: string) => {
      this.router.navigate(['/']);
      return [
         {
            type: AuthActions.SIGNIN
         },
         {
            type: AuthActions.SET_TOKEN,
            payload: token
         }
      ]
   }));

   @Effect({dispatch: false})
   authLogout = this.actions$
      .pipe(ofType(AuthActions.LOGOUT)
         , tap(() => {
            this.router.navigate(['/'])
         }));

   constructor(
      private router: Router,
      private actions$: Actions
   ) { }
}
