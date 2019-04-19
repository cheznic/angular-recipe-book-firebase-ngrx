import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Store } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';

import { Recipe } from '../recipe.model';
import * as RecipeActions from './recipe.actions';
import * as fromRecipe from './recipe.reducers';

@Injectable()
export class RecipeEffects {
   private recipesUri = '/recipes.json';

   @Effect()
   recipeFetch = this.actions$
      .pipe(ofType(RecipeActions.FETCH_RECIPES), switchMap(
         (action: RecipeActions.FetchRecipes) => {
            console.log('Recipe URI:', this.recipesUri);

            return this.httpClient.get<Recipe[]>(
               this.recipesUri, {
                  observe: 'body',
                  responseType: 'json'
               }
            );
         }
      )).pipe(map(
         (recipes) => {
            console.log(recipes);

            for (let recipe of recipes) {
               if (!recipe['ingredients']) {
                  recipe['ingredients'] = [];
               }
            }
            return {
               type: RecipeActions.LOAD_RECIPES,
               payload: recipes
            };
         }
      ));

   @Effect({ dispatch: false })
   recipeStore = this.actions$
      .pipe(ofType(RecipeActions.STORE_RECIPES), withLatestFrom(
         this.store.select('recipes')
      )).pipe(switchMap(
         ([action, state]) => {
            return this.httpClient.put(
               this.recipesUri,
               state.recipes
            );
         }
      ));

   constructor(
      private actions$: Actions,
      private httpClient: HttpClient,
      private store: Store<fromRecipe.FeatureState>
   ) { }
}