import axios from "axios";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../state/actions/authAction";

export class AuthService {
  // Для хранения dispatch
  static dispatch = null;

  /**
   * Инициализация сервиса — нужно вызвать в компоненте, где есть доступ к хукам React
   */
  static initialize() {
    this.dispatch = useDispatch();
    return true;
  }

  /**
   * Авторизация пользователя
   * @param {string} userEmail
   * @param {string} userPassword
   * @returns {Promise<boolean>}
   */
  static async loginUser(userEmail, userPassword) {
    let formAuthData = new FormData();
    formAuthData.append("username", userEmail);
    formAuthData.append("password", userPassword);

    const req = await axios.post(
      import.meta.env.VITE_BACKEND_URL + "/auth/login",
      formAuthData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (req.status === 201) {
      localStorage.setItem("access_token", req.data["access_token"]);
      localStorage.setItem("refresh_token", req.data["refresh_token"]);
      localStorage.setItem("token_type", req.data["token_type"]);
      return true;
    }

    throw new Error("Не удалось авторизировать пользователя");
  }

  /**
   * Регистрация пользователя
   * @param {object} userData
   * @returns {Promise<boolean>}
   */
  static async registerUser(userData) {
    const req = await axios.post(
      import.meta.env.VITE_BACKEND_URL + "/auth/registration",
      JSON.stringify(userData),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (req.status === 201) {
      return true;
    }
    return false;
  }

  /**
   * Обновление токенов безопасности
   * @returns {Promise<boolean>}
   */
  static async updateUserToken() {
    try {
      const req = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/auth/update_token",
        {}
      );

      if (req.status === 201) {
        if (this.dispatch) {
          this.dispatch(loginUser());
        }
        return true;
      }
      throw new Error("Не удалось обновить токен безопасности");
    } catch {
      return false;
    }
  }

  /**
   * Подтверждение аккаунта по секретному коду
   * @param {string} secretCode
   * @returns {Promise<boolean>}
   */
  static async success_account(secretCode) {
    const req = await axios.get(
      import.meta.env.VITE_BACKEND_URL + "/auth/access_create_account",
      {
        params: {
          email: localStorage.getItem("email-registration"),
          secret_key: secretCode,
        },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (req.status === 201) {
      return true;
    }

    throw new Error("Не удалось подтвердить аккаунт пользователя");
  }

  /**
   * Выход пользователя
   */
  static async logoutUser() {
    await axios.post(import.meta.env.VITE_BACKEND_URL + "/auth/logout");
  }

  // --- Методы для сброса пароля ---

  /**
   * Отправка кода для сброса пароля
   * @param {string} email
   * @returns {Promise<boolean>}
   */
  static async sendPasswordResetCode(email) {
    try {
      const req = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/auth/send-reset-code",
        { email },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (req.status === 200 || req.status === 201) {
        return true;
      }
      throw new Error(req.data?.message || "Не удалось отправить код сброса");
    } catch (error) {
      console.error("Ошибка при отправке кода сброса:", error);
      throw error;
    }
  }

  /**
   * Проверка кода сброса пароля
   * @param {string} email
   * @param {string} code
   * @returns {Promise<boolean>}
   */
  static async verifyResetCode(email, code) {
    try {
      const req = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/auth/verify-reset-code",
        { email, code },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (req.status === 200 || req.status === 201) {
        return true;
      }
      throw new Error(req.data?.message || "Неверный код подтверждения");
    } catch (error) {
      console.error("Ошибка при проверке кода:", error);
      throw error;
    }
  }

  /**
   * Сброс пароля с подтверждением кода
   * @param {string} email
   * @param {string} code
   * @param {string} newPassword
   * @returns {Promise<boolean>}
   */
  static async resetPassword(email, code, newPassword) {
    try {
      const req = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/auth/reset-password",
        { email, code, new_password: newPassword },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (req.status === 200 || req.status === 201) {
        return true;
      }
      throw new Error(req.data?.message || "Не удалось сбросить пароль");
    } catch (error) {
      console.error("Ошибка при сбросе пароля:", error);
      throw error;
    }
  }
}
