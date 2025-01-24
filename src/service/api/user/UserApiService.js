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
        console.log(userDataToUpdate, 23);
        const data = await TokenMixin.tokenData();
        const req = await axios.put(process.env.REACT_APP_BACKEND_URL + "/user/update_user_information", userDataToUpdate, {
            withCredentials: true,
            headers: {
                Authorization: "Bearer " + data[0],
                "Content-Type": "application/json"
            }
        });

        console.log(req.data);
    }
}