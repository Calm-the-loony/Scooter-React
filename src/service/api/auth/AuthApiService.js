import axios from "axios";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../state/actions/authAction";

export class AuthService {
  static initialize = () => {
    this.dispatch = useDispatch();
    return true;
  };

  /**
   * Авторизация пользователя
   * @param {*} userEmail
   * @param {*} userPassword
   * @returns
   */
  static async loginUser(userEmail, userPassword) {
    let formAuthData = new FormData();

    // Данные для аутентификации
    formAuthData.append("username", userEmail);
    formAuthData.append("password", userPassword);

    let req = await axios.post(
      import.meta.env.VITE_BACKEND_URL + "/auth/login",
      formAuthData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    if (req.status === 201) {
      return true;
    }

    throw new Error("Не удалось авторизировать пользователя");
  }

  /**
   * Регистрация пользователя
   * @param {*} userData
   * @returns
   */
  static async registerUser(userData) {
    let req = await axios.post(
      import.meta.env.VITE_BACKEND_URL + "/auth/registration",
      JSON.stringify(userData),
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (req.status === 201) {
      return true;
    }

    return false;
  }

  /**
   * Обновление токенов безопасности
   * @returns
   */
  static async updateUserToken() {
    try {
      const req = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/auth/update_token",
        {},
      );

      if (req.status === 201) {
        this.dispatch(loginUser());
        return true;
      } else {
        throw Error("Не удалось обновить токен безопасности");
      }
    } catch {
      return false;
    }
  }

  static async success_acount(secretCode) {
    const req = await axios.get(
      import.meta.env.VITE_BACKEND_URL + "/auth/access_create_account",
      {
        params: {
          email: localStorage.getItem("email-registration"),
          secret_key: secretCode,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (req.status === 201) {
      return true;
    }

    throw new Error("Не удалось подвердить аккаунт пользователя");
  }

  static async logoutUser() {
    await axios.post(import.meta.env.VITE_BACKEND_URL + "/auth/logout");
  }
}
