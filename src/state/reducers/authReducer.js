import { parseCookieString } from "../../service/token_service";

const cookieData = parseCookieString();
console.log(cookieData, 3232323);

const initial_state = {
    isAuthenticated: cookieData.access_token || cookieData.refresh_token ? true : false
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
