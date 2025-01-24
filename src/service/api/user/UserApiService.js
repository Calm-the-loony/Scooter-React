import axios from "axios";
import { TokenMixin } from "../mixins/UserMixins";
import UserDTO from "../../dto/UserDTO";


export class UserApiService {

    /**
     * GET: Получаем краткую информацию о пользователе
     * @returns 
     */
    static async informationAboutUser() {
        const tokens = await TokenMixin.tokenData();
        const req = await axios.get(process.env.REACT_APP_BACKEND_URL + "/user/information_about_user", {
            headers: {
                "Authorization": "Bearer " + tokens[0]
            }
        });
        
        if (req.status === 200) {
            return req.data
        } else {
            return false
        }
    }

    static async updateUserInformation(userDataToUpdate) {
        const data = await TokenMixin.tokenData();
        const req = await axios.put(process.env.REACT_APP_BACKEND_URL + "/user/update_user_information", userDataToUpdate, {
            withCredentials: true,
            headers: {
                Authorization: "Bearer " + data[0],
                "Content-Type": "application/json"
            }
        });
        
        if (req.status === 200) {
            return true;
        } else {
            return false;
        }
    }

    static async userOrders() {
        const data = await TokenMixin.tokenData();
        const req = await axios.get(process.env.REACT_APP_BACKEND_URL + "/order/get_orders_by_id_user", {
            headers: {
                withCredentials: true,
                Authorization: "Bearer " + data[0] 
            }
        });

        if (req.status === 200) {
            return req.data;
        } else {
            return false;
        }
    }

    static async updateUserPassword(oldPassword, newPassword) {
        const data = await TokenMixin.tokenData();
        const req = await axios.patch(process.env.REACT_APP_BACKEND_URL + "/auth/update_password", {
            "old_password": oldPassword,
            "new_password": newPassword
        }, {
            headers: {
                withCredentials: true,
                Authorization: "Bearer " + data[0],
                "Content-Type": "application/json"
            }
        });

        if (req.status === 204) {
            console.log(req);
            return true;
        } else {
            return false;
        }
    }
}