import axios from "axios";
import { parseCookieString } from "../../token_service";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../state/actions/authAction";


export class AuthService {

    static initialize = () => {
        this.dispatch = useDispatch();
        return true
    }

    /**
     * Авторизация пользователя
     * @param {*} userEmail 
     * @param {*} userPassword 
     * @returns 
     */
    static async loginUser(userEmail, userPassword) {
        
        try {
            let formAuthData = new FormData();
        
            // Данные для аутентификации
            formAuthData.append("username", userEmail);
            formAuthData.append("password", userPassword);
    
            let req = await axios.post(process.env.REACT_APP_BACKEND_URL + "/auth/login", formAuthData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
    
            if (req.status === 201) {
                document.cookie = `access_token=${req.data.access_token}`;
                document.cookie = `refresh_token=${req.data.refresh_token}`;
                document.cookie = `token_type=${req.data.token_type}`;
                return true
            }
    
            return false
        } catch (e) {
            return false;
        }
    }

    /**
     * Регистрация пользователя
     * @param {*} userData 
     * @returns 
     */
    static async registerUser(userData) {

        console.log(JSON.stringify(userData));

        let req = await axios.post(process.env.REACT_APP_BACKEND_URL + "/auth/registration", JSON.stringify(userData), {
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
        
        try {
            const tokens = parseCookieString();

            const req = await axios.post(process.env.REACT_APP_BACKEND_URL + "/auth/update_token", {
            }, {
                params: {
                    refresh_token: tokens.refresh_token
                }
            });
    
            if (req.status === 201) {
                document.cookie = "access_token=; Max-Age=-1; path=/";
                document.cookie = "access_token="+req.data.access_token;
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

        const req = await axios.get(process.env.REACT_APP_BACKEND_URL + "/auth/access_create_account", {
            params: {
                email: localStorage.getItem("email-registration"),
                secret_key: secretCode
            }
        }, {
            headers: {
                "Content-Type": "application/json"
            },
        });

        if (req.status === 201) {
            return true;
        }

        throw new Error("Не удалось подвердить аккаунт пользователя");
    }
}