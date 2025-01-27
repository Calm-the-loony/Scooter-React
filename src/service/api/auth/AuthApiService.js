import axios from "axios";


export class AuthService {
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

        let req = await axios.post(process.env.REACT_APP_BACKEND_URL+"/auth/login", formAuthData, {
            withCredentials: true,
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        if (req.status === 201) {
            return true
        }

        return false
    }

    /**
     * Регистрация пользователя
     * @param {*} userData 
     * @returns 
     */
    static async registerUser(userData) {

        let req = await axios.post(process.env.REACT_APP_BACKEND_URL + "/auth/registration", {
            email_user: userData.emailUser,
            password_user: userData.passwordUser,
            name_user: userData.nameUser,
            main_name_user: userData.mainNameUser,
            date_registration: null
        }, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json"
            },
        });

        if (req.status === 201) {
            return true
        }

        return false
    }

    /**
     * Обновление токенов безопасности
     * @returns 
     */
    static async updateUserToken() {
        const req = await axios.post(process.env.REACT_APP_BACKEND_URL + "/auth/update_token", {
        }, {
            withCredentials: true
        });

        if (req.status === 201) {
            return true;
        } else {
            return false;
        }
    }
}