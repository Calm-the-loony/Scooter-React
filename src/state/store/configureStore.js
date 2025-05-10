import {combineReducers, createStore} from "redux";

import {authUserReducer} from "../reducers/authReducer";
import {userReducer} from "../reducers/userReducer";

export const rootReducers = combineReducers(
    {
        auth: authUserReducer,
        user: userReducer
    }
);

const scooterStore = createStore(
  rootReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default scooterStore;
