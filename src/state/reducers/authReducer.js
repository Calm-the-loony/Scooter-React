import { parseCookieString } from "../../service/token_service";

const initial_state = {
  isAuthenticated:
    localStorage.getItem("access_token") || localStorage.getItem("refresh_token") ? true : false,
};

export const authUserReducer = (state = initial_state, action) => {
  switch (action.type) {
    case "AUTH": {
      return { ...state, isAuthenticated: true };
    }
    case "AUTH_EXIT": {
      return { ...state, isAuthenticated: false };
    }
    default: {
      return { ...state };
    }
  }
};
