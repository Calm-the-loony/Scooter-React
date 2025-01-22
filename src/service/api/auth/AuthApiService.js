import axios from "axios";
import { TokenMixin } from "../mixins/UserMixins";

export class AuthService {
    static async loginUser(userEmail, userPassword) {
        
        let formAuthData = new FormData();
        
        // Данные для аутентификации
        formAuthData.append("username", userEmail);
        formAuthData.append("password", userPassword);

        let req = await axios.post(process.env.REACT_APP_BACKEND_URL+"/auth/login", formAuthData, {
            withCredentials: true,
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        if (req.status === 201) {
            await TokenMixin.safeToken(req.data);
            return true
        }

        return false
    }

    static async registerUser(userData) {
        let req = await axios.post(process.env.REACT_APP_BACKEND_URL + "/auth/register", {}, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json"
            }
        })

        if (req.status === 201) {
            return true
        }

        return false
    }
}