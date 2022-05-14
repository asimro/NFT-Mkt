import { legacy_createStore as createStore } from 'redux'
import { applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { reducerBC } from './redux/reducer'


export const rootReducer = combineReducers({
    data: reducerBC
});


const middleware = [thunk];
const composeEnhancers = compose(applyMiddleware(...middleware));


const configureStore = () => {
    return createStore(rootReducer, composeEnhancers);
};


export const store = configureStore()