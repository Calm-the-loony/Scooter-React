import { combineReducers, createStore, applyMiddleware } from "redux";

import { authUserReducer } from "../reducers/authReducer";
import { userReducer } from "../reducers/userReducer";
import { thunk } from "redux-thunk";

export const rootReducers = combineReducers({
  auth: authUserReducer,
  user: userReducer,
});

const scooterStore = createStore(rootReducers, applyMiddleware(thunk));

export default scooterStore;
