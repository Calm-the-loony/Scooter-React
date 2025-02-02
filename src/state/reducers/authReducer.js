export const authUserReducer = (state = false, action) => {
    switch (action.type) {
        case "AUTH": {
            localStorage.setItem("isAuthenticated", true);
            return true;
        };
        case "AUTH_EXIT": {
            localStorage.removeItem("isAuthenticated");
            return false;
        };
        default: {
            state = localStorage.getItem("isAuthenticated");
            return state;
        }
    }
};
