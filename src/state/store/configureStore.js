import { authUserReducer } from "../reducers/authReducer";
import { createStore } from "redux";


const scooterStore = createStore(
    authUserReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default scooterStore;