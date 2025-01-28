import { authUserReducer } from "../reducers/authReducer";
import { createStore } from "redux";


const scooterStore = createStore(authUserReducer);

export default scooterStore;
