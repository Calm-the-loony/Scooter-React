
const initialState = {
    full_information: JSON.parse(localStorage.getItem("userData"))
}


export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "INFO": {
            return state
        }
        case "SET_INFO": {
            return {...state, full_information: action.payload};
        }
        default:
            return state
    }
}