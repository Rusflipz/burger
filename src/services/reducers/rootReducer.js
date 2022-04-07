import { combineReducers } from 'redux';

import ingredientsReducer from '../slice/ingredients';
import profileReducer from '../slice/profile';

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    profile: profileReducer
})