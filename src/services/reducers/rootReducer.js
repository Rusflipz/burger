import { combineReducers } from 'redux';

import ingredientsReducer from '../slice/ingredients';
import profileReducer from '../slice/profile';
import orderReducer from '../slice/order';
import headerLinksReducer from '../slice/HeaderLinks';

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    profile: profileReducer,
    order: orderReducer,
    headerLinks: headerLinksReducer,
})