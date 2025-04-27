import axios from "axios";
import { AuthService } from "../auth/AuthApiService";
import { parseCookieString, deleteCookieData } from "../../token_service";

export class UserApiService {
  /**
   * GET: Получаем краткую информацию о пользователе
   * @returns
   */
  static async informationAboutUser(limit = 0) {
    try {
      const cookies = parseCookieString();

      const req = await axios.get(
        process.env.REACT_APP_BACKEND_URL + "/user/information",
        {
          headers: {
            Authorization: cookies.token_type + " " + cookies.access_token,
          },
        },
      );
      return req.data;
    } catch (er) {
      if (limit > 0) {
        return false;
      }

      await AuthService.updateUserToken();
      await this.informationAboutUser(limit + 1);
    }
  }

  /**
   * Обновление пользовательской информации
   * @param {*} userDataToUpdate
   * @returns
   */
  static async updateUserInformation(userDataToUpdate, limit = 0) {
    try {
      const cookies = parseCookieString();
      const req = await axios.put(
        process.env.REACT_APP_BACKEND_URL + "/user/update",
        userDataToUpdate,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: cookies.token_type + " " + cookies.access_token,
          },
        },
      );

      return true;
    } catch {
      if (limit > 0) {
        return false;
      }

      await AuthService.updateUserToken();
      await this.updateUserInformation(limit + 1);
    }
  }

  /**
   * Получение заказов пользователя
   * @returns
   */
  static async userOrders(limit = 0) {
    try {
      const cookies = parseCookieString();
      const req = await axios.get(
        process.env.REACT_APP_BACKEND_URL + "/order/orders",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: cookies.token_type + " " + cookies.access_token,
          },
        },
      );

      return req.data;
    } catch (er) {
      if (limit > 0) {
        return false;
      }

      await AuthService.updateUserToken();
      await this.userOrders(limit + 1);
    }
  }

  /**
   * Получение оплаченных заказов пользователем
   */
  static async userSuccessOrders(limit = 0) {
    try {
      const cookies = parseCookieString();
      const req = await axios.get(
        process.env.REACT_APP_BACKEND_URL + "/user/success/orders",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: cookies.token_type + " " + cookies.access_token,
          },
        },
      );

      return req.data;
    } catch {
      if (limit > 0) {
        return false;
      }

      await AuthService.updateUserToken();
      await this.userSuccessOrders(limit + 1);
    }
  }

  /**
   * Обновление пароля пользователя
   * @param {*} oldPassword
   * @param {*} newPassword
   * @returns
   */
  static async updateUserPassword(oldPassword, newPassword, limit = 0) {
    try {
      const cookies = parseCookieString();
      await axios.patch(
        process.env.REACT_APP_BACKEND_URL + "/auth/update/password",
        {
          old_password: oldPassword,
          new_password: newPassword,
        },
        {
          headers: {
            Authorization: cookies.token_type + " " + cookies.access_token,
            "Content-Type": "application/json",
          },
        },
      );

      deleteCookieData();

      return true;
    } catch {
      if (limit > 0) {
        return false;
      }
    }
  }

  /**
   * Избранные товары пользователя
   * @returns
   */
  static async userFavourites(limit = 0) {
    try {
      const cookies = parseCookieString();
      const req = await axios.get(
        process.env.REACT_APP_BACKEND_URL + "/favourite/all/user",
        {
          headers: {
            Authorization: cookies.token_type + " " + cookies.access_token,
          },
        },
      );
      return req.data;
    } catch {
      if (limit > 0) {
        return false;
      }

      await AuthService.updateUserToken();
      await this.userFavourites(limit + 1);
    }
  }

  /**
   * Удаление избранного товара
   * @returns
   */
  static async deleteUserFavourite(id_favourite, limit = 0) {
    try {
      const cookies = parseCookieString();
      await axios.delete(
        process.env.REACT_APP_BACKEND_URL + "/favourite/delete",
        {
          params: {
            id_favourite: id_favourite,
          },
          headers: {
            Authorization: cookies.token_type + " " + cookies.access_token,
          },
        },
      );
      return true;
    } catch {
      if (limit > 0) {
        return false;
      }

      await AuthService.updateUserToken();
      await this.deleteUserFavourite(limit + 1);
    }
  }

  /**
   * Добавление нового товара в избранное
   * @param {*} id_product
   * @returns
   */
  static async addNewFavourite(id_product, limit = 0) {
    try {
      const cookies = parseCookieString();
      const req = await axios.post(
        process.env.REACT_APP_BACKEND_URL + "/favourite/create",
        {
          id_product: id_product,
        },
        {
          headers: {
            Authorization: cookies.token_type + " " + cookies.access_token,
          },
        },
      );

      return req.data;
    } catch {
      if (limit > 0) {
        return false;
      }

      await AuthService.updateUserToken();
      await this.addNewFavourite(limit + 1);
    }
  }

  /**
   * Добавление товара в корзину
   * @param {*} id_product
   * @returns
   */
  static async addProductToBasket(id_product, limit = 0) {
    try {
      const cookies = parseCookieString();
      let dateNow = new Date();
      await axios.post(
        process.env.REACT_APP_BACKEND_URL + "/order/create",
        {
          id_product: id_product,
          date_create: `${dateNow.getFullYear()}-${dateNow.getMonth().toString().padStart(2, "0")}-${dateNow.getDate().toString().padStart(2, "0")}`,
        },
        {
          headers: {
            Authorization: cookies.token_type + " " + cookies.access_token,
          },
        },
      );
      return true;
    } catch (er) {
      if (limit > 0) {
        return false;
      }

      await AuthService.updateUserToken();
      await this.addProductToBasket(limit + 1);
    }
  }

  /**
   * Список заказов пользователя
   * @returns
   */
  static async userOrders(limit = 0) {
    try {
      const cookies = parseCookieString();
      const req = await axios.get(
        process.env.REACT_APP_BACKEND_URL + "/order/all/user",
        {
          headers: {
            Authorization: cookies.token_type + " " + cookies.access_token,
          },
        },
      );

      return req.data;
    } catch (er) {
      if (limit > 0) {
        return false;
      }

      await AuthService.updateUserToken();
      await this.userOrders(limit + 1);
    }
  }

  /**
   * Удаление заказа
   * @param {*} quantity
   * @returns
   */
  static async deleteUserOrder(id_order, limit = 0) {
    try {
      const cookies = parseCookieString();
      await axios.delete(
        process.env.REACT_APP_BACKEND_URL + `/order/delete/${id_order}`,
        {
          headers: {
            Authorization: cookies.token_type + " " + cookies.access_token,
          },
        },
      );
      return true;
    } catch (err) {
      if (limit > 0) {
        return false;
      }

      await AuthService.updateUserToken();
      await this.deleteUserOrder(limit + 1);
    }
  }
}
