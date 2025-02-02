export const authUserReducer = (state = false, action) => {
    switch (action.type) {
        case "AUTH": {
            state = true;
            return state;
        };
        case "EXIT": {
            state = false;
            return state;
        };
        default:
            return state;
    }
};
