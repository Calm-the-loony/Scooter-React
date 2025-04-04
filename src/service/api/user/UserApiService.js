import axios from "axios";
import { AuthService } from "../auth/AuthApiService";


export class UserApiService {

    /**
     * GET: Получаем краткую информацию о пользователе
     * @returns 
     */
    static async informationAboutUser() {
        try {
            const req = await axios.get(process.env.REACT_APP_BACKEND_URL + "/user/information", {
                headers: {
                },
                withCredentials: true
            });

            return req.data;
        } catch {
            return false;
        }
    }

    /**
     * Обновление пользовательской информации
     * @param {*} userDataToUpdate 
     * @returns 
     */
    static async updateUserInformation(userDataToUpdate) {

        try {
            const req = await axios.put(process.env.REACT_APP_BACKEND_URL + "/user/update", userDataToUpdate, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                }
            });

            return true;
        } catch {
            return false;
        }
        
    }

    /**
     * Получение заказов пользователя
     * @returns 
     */
    static async userOrders() {
        try {
            const req = await axios.get(process.env.REACT_APP_BACKEND_URL + "/order/orders", {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });
            
            return req.data;
        } catch (er) {
            return false;
        }
    }

    /**
     * Получение оплаченных заказов пользователем
     */
    static async userSuccessOrders() {
        try {
            const req = await axios.get(process.env.REACT_APP_BACKEND_URL + "/user/success/orders", {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                }
            })

            return req.data;
        } catch {
            return false;
        }
    }

    /**
     * Обновление пароля пользователя
     * @param {*} oldPassword 
     * @param {*} newPassword 
     * @returns 
     */
    static async updateUserPassword(oldPassword, newPassword) {
        try {
            await axios.patch(process.env.REACT_APP_BACKEND_URL + "/auth/update/password", {
                "old_password": oldPassword,
                "new_password": newPassword
            }, {
                headers: {
                    withCredentials: true,
                    "Content-Type": "application/json"
                }
            });

            return true
        } catch {
            return false;
        }
    }

    /**
     * Избранные товары пользователя
     * @returns
     */
    static async userFavourites() {
        try {
            const req = await axios.get(process.env.REACT_APP_BACKEND_URL + "/favourite/all/user", {
                withCredentials: true
            });
            return req.data;
        } catch {
            return false;
        }
    }

    /**
     * Удаление избранного товара
     * @returns
     */
    static async deleteUserFavourite(id_favourite) {
        try {
            await axios.delete(process.env.REACT_APP_BACKEND_URL + "/favourite/delete", {
                params: {
                    id_favourite: id_favourite
                },
                withCredentials: true,
            });
            return true
        } catch {
            return false;
        }
    }

    /**
     * Добавление нового товара в избранное
     * @param {*} id_product 
     * @returns 
     */
    static async addNewFavourite(id_product) {
        try {
            const req = await axios.post(process.env.REACT_APP_BACKEND_URL + "/favourite/create", {
                id_product: id_product
            }, {
                withCredentials: true
            })

            return req.data;
        } catch {
            return false;
        }
    }

    /**
     * Добавление товара в корзину
     * @param {*} id_product 
     * @returns 
     */
    static async addProductToBasket(id_product) {
        try {
            let dateNow = new Date();
            await axios.post(process.env.REACT_APP_BACKEND_URL + "/order/create", {
                id_product: id_product,
                date_create: `${dateNow.getFullYear()}-${dateNow.getMonth().toString().padStart(2, '0')}-${dateNow.getDate().toString().padStart(2, "0")}`
            }, {
                withCredentials: true,
            });
            return true;
        } catch (er) {
            return false;
        }
    }

    /**
     * Список заказов пользователя
     * @returns 
     */
    static async userOrders() {
        try {
            const req = await axios.get(process.env.REACT_APP_BACKEND_URL + "/order/all/user", {
                withCredentials: true
            });

            return req.data
        } catch (er) {

            return false;
        }
    }

    /**
     * Удаление заказа
     * @param {*} quantity 
     * @returns 
     */
    static async deleteUserOrder(id_order) {
        try {
            await axios.delete(process.env.REACT_APP_BACKEND_URL + `/order/delete/${id_order}`, {
                withCredentials: true
            });
            return true;
        } catch (err) {
            return false;
        }
    }
}