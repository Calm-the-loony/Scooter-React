export const loginUser = () => {
    return {
        type: "AUTH",
        payload: {},
    };
}

export const exitUser = () => {
    return {
        type: "AUTH_EXIT"
    };
}
