import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { reducer as productReducer } from "./products/reducer";
import { reducer as authReducer } from "./authentication/reducer";
import thunk from "redux-thunk";

const reducer = combineReducers({ productReducer, authReducer });

export const store = legacy_createStore(reducer, applyMiddleware(thunk));