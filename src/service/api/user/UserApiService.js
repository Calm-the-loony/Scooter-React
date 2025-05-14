import axios from "axios";

export class UserApiService {
  /**
   * GET: Получаем краткую информацию о пользователе
   * @returns
   */
  static async informationAboutUser() {
    const req = await axios.get(
      import.meta.env.VITE_BACKEND_URL + "/user/information",
    );
    return req.data;
  }

  /**
   * Обновление пользовательской информации
   * @param {*} userDataToUpdate
   * @returns
   */
  static async updateUserInformation(userDataToUpdate) {
    const req = await axios.put(
      import.meta.env.VITE_BACKEND_URL + "/user/update",
      userDataToUpdate,
    );

    return true;
  }

  /**
   * Получение заказов пользователя
   * @returns
   */
  static async userOrders() {
    const req = await axios.get(
      import.meta.env.VITE_BACKEND_URL + "/order/all",
    );

    return req.data;
  }

  /**
   * Получение оплаченных заказов пользователем
   */
  static async userSuccessOrders() {
    const req = await axios.get(
      import.meta.env.VITE_BACKEND_URL + "/user/success/orders",
    );

    return req.data;
  }

  /**
   * Обновление пароля пользователя
   * @param {*} oldPassword
   * @param {*} newPassword
   * @returns
   */
  static async updateUserPassword(oldPassword, newPassword) {
    await axios.patch(
      import.meta.env.VITE_BACKEND_URL + "/auth/update/password",
      {
        old_password: oldPassword,
        new_password: newPassword,
      },
    );

    return true;
  }

  /**
   * Избранные товары пользователя
   * @returns
   */
  static async userFavourites() {
    const req = await axios.get(
      import.meta.env.VITE_BACKEND_URL + "/favourite/all/user",
    );
    return req.data;
  }

  /**
   * Удаление избранного товара
   * @returns
   */
  static async deleteUserFavourite(id_favourite) {
    await axios.delete(import.meta.env.VITE_BACKEND_URL + "/favourite/delete", {
      params: {
        id_favourite: id_favourite,
      },
    });
    return true;
  }

  /**
   * Добавление нового товара в избранное
   * @param {*} id_product
   * @returns
   */
  static async addNewFavourite(id_product) {
    const req = await axios.post(
      import.meta.env.VITE_BACKEND_URL + "/favourite/create",
      {
        id_product: id_product,
      },
    );

    return req.data;
  }

  /**
   * Добавление товара в корзину
   * @param {*} id_product
   * @returns
   */
  static async addProductToBasket(id_product) {
    let dateNow = new Date();
    await axios.post(import.meta.env.VITE_BACKEND_URL + "/order/create", {
      id_products: [id_product],
      date_create: `${dateNow.getFullYear()}-${dateNow.getMonth().toString().padStart(2, "0")}-${dateNow.getDate().toString().padStart(2, "0")}`,
    });
    return true;
  }

  /**
   * Список заказов пользователя
   * @returns
   */
  static async userOrders() {
    const req = await axios.get(
      import.meta.env.VITE_BACKEND_URL + "/order/all/user",
    );

    return req.data;
  }

  /**
   * Удаление заказа
   * @param {*} quantity
   * @returns
   */
  static async deleteUserOrder(id_order) {
    await axios.delete(
      import.meta.env.VITE_BACKEND_URL + `/order/delete/${id_order}`,
    );
    return true;
  }

  static async createUserOder(userOrderData) {
    await axios.post(
      import.meta.env.VITE_BACKEND_URL + "/order/create",
      userOrderData,
    );
  }

  static async buyOrder(orderData) {
    return await axios.post(
      import.meta.env.VITE_BACKEND_URL + "/order/buy",
      orderData,
    );
  }
}
