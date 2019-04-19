import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';
import * as fromRecipe from './recipe.actions';
import * as fromApp from '../../store/app.reducers';

export interface State {
   recipes: Recipe[];
}

export interface FeatureState extends fromApp.AppState {
   recipes: State;
}

const initialState = {
   recipes: [
      new Recipe(
         "Banana Bread",
         "Delicious banana bread from you own kitchen.",
         "https://cdn.cpnscdn.com/static.coupons.com/ext/kitchme/images/recipes/600x400/banana-banana-bread_8441.jpg",
         [
            new Ingredient('banana', 3),
            new Ingredient('flour', 1)
         ]),
      new Recipe(
         "Coffee Cake",
         "Coffee cake, the best you've ever had.",
         "https://www.washingtonpost.com/rf/image_982w/2010-2019/WashingtonPost/2016/12/12/Food/Images/food_0181475702475.jpg",
         [
            new Ingredient('eggs', 3),
            new Ingredient('brown sugar', 1)
         ]),
      new Recipe(
         "Spaghetti",
         "Spaghetti just like Mama used to make when you were a kid!",
         "https://images.food52.com/jl3HghEzrA692Qzd2_vdj7Xpiog=/753x502/49bbce59-a7ec-4c53-ab05-104d3ea6195f--spagetti-med-kottfarssas.jpg",
         [
            new Ingredient('box of dry spaghetti', 1),
            new Ingredient('Classico pasta sauce', 1)
         ]),
      new Recipe(
         "Tacos!",
         "Authentic pork tacos, perfect for summer parties.",
         "https://livewelleatsmart.com/wp-content/uploads/2018/11/slow-cooker-carnitas-tacos-ck-1804p38.jpg",
         [
            new Ingredient('pack of corn tortillas', 1),
            new Ingredient('pound of pork tenderloin', 1)
         ])
   ]
};

export function recipeReducer(state = initialState, action: fromRecipe.RecipeActions) {
   let recipeList: Recipe[];
   switch (action.type) {
      case (fromRecipe.LOAD_RECIPES):
         return {
            ...state,
            recipes: [...action.payload]
         };
      case (fromRecipe.ADD_RECIPE):
         return {
            ...state,
            recipe: [...state.recipes, action.payload]
         };
      case (fromRecipe.UPDATE_RECIPE):
         const recipe = state.recipes[action.payload.index];
         const updatedRecipe = {
            ...recipe,
            ...action.payload.updatedRecipe
         };
         recipeList = [...state.recipes];
         recipeList[action.payload.index] = updatedRecipe;
         return {
            ...state,
            recipes: recipeList
         };
      case (fromRecipe.DELETE_RECIPE):
         recipeList = [...state.recipes];
         recipeList.splice(action.payload, 1);
         return {
            ...state,
            recipes: recipeList
         };
      default:
         return state;
   }
} 