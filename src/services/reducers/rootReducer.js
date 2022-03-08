import { combineReducers } from 'redux';

import ingredientsReducer from '../slice/ingredients';

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
})