import { combineReducers } from 'redux';

import { burgerСonstructorReducer } from './burger-constructor';
import { burgerIngredientsReducer } from './burger-ingredients';
import { ingredientDetailsReducer } from './ingredient-details';
import { orderDetailsReducer } from './order-details';
import { authReducer } from './user';

export const rootReducer = combineReducers({
  burgerConstructor: burgerСonstructorReducer,
  burgerIngredients: burgerIngredientsReducer,
  ingredientDetails: ingredientDetailsReducer,
  orderDetails: orderDetailsReducer,
  authData: authReducer,
});

export const getBurgerConstructor = (store) => store.burgerConstructor;
export const getBurgerIngredients = (store) => store.burgerIngredients;
export const getIngredientDetails = (store) => store.ingredientDetails;
export const getOrderDetails = (store) => store.orderDetails;
export const getAuthData = (store) => store.authData;