import { UserApiService } from "../../service/api/user/UserApiService";


const initial_state = {
    isAuthenticated: false
}

export const authUserReducer = (state = initial_state, action) => {
    switch (action.type) {
        case "AUTH": {
            return {...state, isAuthenticated: true};
        };
        case "AUTH_EXIT": {
            return {...state, isAuthenticated: false};
        };
        default: {
            return {...state};
        }
    }
};
