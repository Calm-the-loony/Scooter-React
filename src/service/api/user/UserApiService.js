import axios from "axios";
import { AuthService } from "../auth/AuthApiService";


export class UserApiService {

    /**
     * GET: Получаем краткую информацию о пользователе
     * @returns 
     */
    static async informationAboutUser() {
        try {
            const req = await axios.get(process.env.REACT_APP_BACKEND_URL + "/user/information_about_user", {
                headers: {
                },
                withCredentials: true
            });

            return req.data;
        } catch {
            const updateToken = await AuthService.updateUserToken();
            if (updateToken === true) {
                await this.informationAboutUser();
            } else {
                return false
            }
        }
    }

    /**
     * Обновление пользовательской информации
     * @param {*} userDataToUpdate 
     * @returns 
     */
    static async updateUserInformation(userDataToUpdate) {
        const req = await axios.put(process.env.REACT_APP_BACKEND_URL + "/user/update_user_information", userDataToUpdate, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json"
            }
        });

        
        if (req.status === 200) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Получение заказов пользователя
     * @returns 
     */
    static async userOrders() {
        const req = await axios.get(process.env.REACT_APP_BACKEND_URL + "/order/get_orders_by_id_user", {
            headers: {
                
            },
            withCredentials: true
        });
        
        if (req.status === 200) {
            return req.data;
        } else {
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
        const req = await axios.patch(process.env.REACT_APP_BACKEND_URL + "/auth/update_password", {
            "old_password": oldPassword,
            "new_password": newPassword
        }, {
            headers: {
                withCredentials: true,
                "Content-Type": "application/json"
            }
        });

        if (req.status === 204) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Избранные товары пользователя
     * @returns
     */
    static async userFavourites() {
    }
}