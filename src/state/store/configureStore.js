import { authUserReducer } from "../reducers/authReducer";
import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";


const persistConfig = {
    key: 'root',
    storage
};


const persReducer = persistReducer(persistConfig, authUserReducer); 
const scooterStore = createStore(
    persReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export const persist = persistStore(scooterStore);

export default scooterStore;
