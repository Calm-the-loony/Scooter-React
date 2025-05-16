import { UserApiService } from "../../service/api/user/UserApiService";
import { exitUser, loginUser } from "../actions/authAction";

export const checkAuthUser = () => async (dispatch) => {
  try {
    const data = await UserApiService.informationAboutUser();
    if (data) {
      dispatch(loginUser());
    }
  } catch {
    dispatch(exitUser());
  }
};
