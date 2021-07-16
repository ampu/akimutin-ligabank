import {applyMiddleware, combineReducers, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({});

const initialState = {};

export const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunk)));
