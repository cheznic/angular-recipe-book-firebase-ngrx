import * as ShoppingListActions from './shopping-list.actions';

import { Ingredient } from '../../shared/ingredient.model';

export interface State {
   ingredients: Ingredient[];
   editedIngredient: Ingredient;
   editedIngredientIndex: number;
}

export const initialState = {
   ingredients: [
      new Ingredient('Apples', 5),
      new Ingredient('Pears', 10)
   ],
   editedIngredient: null,
   editedIngredientIndex: -1
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions) {
   let ingredients;
   switch (action.type) {
      case ShoppingListActions.ADD_INGREDIENT:
         return {
            ...state,
            ingredients: [...state.ingredients, action.payload]
         };

      case ShoppingListActions.ADD_INGREDIENTS:
         return {
            ...state,
            ingredients: [...state.ingredients, ...action.payload]
         };

      case ShoppingListActions.UPDATE_INGREDIENT:
         const ingredient = state.ingredients[state.editedIngredientIndex];
         const updatedIngredient = {
            ...ingredient,
            ...action.payload.ingredient
         };
         ingredients = [...state.ingredients];
         ingredients[state.editedIngredientIndex] = updatedIngredient;
         return {
            ...state,
            ingredients: ingredients
         };

      case ShoppingListActions.DELETE_INGREDIENT:
         ingredients = [...state.ingredients];
         ingredients.splice(state.editedIngredientIndex, 1);
         return {
            ...state,
            ingredients: ingredients
         };

      case ShoppingListActions.START_EDIT:
         const editedIngredient = { ...state.ingredients[action.payload] };
         return {
            ...state,
            editedIngredient: editedIngredient,
            editedIngredientIndex: action.payload
         };

      case ShoppingListActions.STOP_EDIT:
         return {
            ...state,
            editedIngredient: null,
            editedIngredientIndex: -1
         };

      default:
         return state;
   }
}
