export const authUserReducer = (state, action) => {
    switch (action.type) {
        case "AUTH": {
            return true;
        };
        case "EXIT": {
            return false;
        };
        default:
            return state;
    }
};
