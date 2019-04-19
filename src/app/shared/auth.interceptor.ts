import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

import * as fromApp from '../store/app.reducers';
import * as fromAuth from '../auth/store/auth.reducers'
import credentials from '../../assets/firebase-credentials';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
   constructor(private store: Store<fromApp.AppState>) { }

   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return this.store.select('auth')
         .pipe(take(1),
         switchMap((authState: fromAuth.State) => {
            const rCopy = req.clone(
               {
                  params: req.params.set('auth', authState.token),
                  url: credentials.databaseURL + req.url
               }
            );
            return next.handle(rCopy);
         })
      )
   }
}
