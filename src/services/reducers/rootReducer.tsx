import { combineReducers } from 'redux';

import ingredientsReducer from '../slice/ingredients';
import profileReducer from '../slice/profile';
import webSoketReducer from '../slice/webSoket';
import headerLinksReducer from '../slice/HeaderLinks';

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    profile: profileReducer,
    webSoket: webSoketReducer,
    headerLinks: headerLinksReducer,
})

export type RootState = ReturnType<typeof rootReducer>