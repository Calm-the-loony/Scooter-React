import axios from "axios";
import { AuthService } from "../auth/AuthApiService";
import { parseCookieString } from "../../token_service";


export default class GarageApiService {

    static async productForGarage(id_mark, id_moto_type, id_model) {
        try {
            const cookies = parseCookieString();
            id_mark ??= null;
            id_model ??= null;
            id_moto_type ??= null;

            const req = await axios.get(process.env.REACT_APP_BACKEND_URL + "/product/all/garage/filter", {
                params: {
                    id_brand: id_mark,
                    id_model: id_model,
                    id_moto_type: id_moto_type
                },
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: cookies.token_type + " " + cookies.access_token
                }
            })

            return req.data;
        } catch {
            return [];
        }
    }

    /**
     * Добавление транспорта в гараж
     * @param {*} newTrasport 
     * @returns 
     */
    static async addedGarage(newTrasport) {
        try {
            const cookies = parseCookieString();
            const req = await axios.post(process.env.REACT_APP_BACKEND_URL + '/garage/create', newTrasport, {
                headers: {
                    Authorization: cookies.token_type + " " + cookies.access_token
                }
            });

            return req.data;
        } catch (er) {
            return false;
        }

    }

    /**
     * Пользовательский гараж
     * @returns 
     */
    static async myGarage() {
        try {
            const cookies = parseCookieString();
            const req = await axios.get(process.env.REACT_APP_BACKEND_URL + "/garage/all", {
                headers: {
                    Authorization: cookies.token_type + " " + cookies.access_token
                }
            });

            return req.data;
        } catch (er) {
            return false;
        }

    }

    /**
     * Удаление транспорта с гаража
     * @param {*} id_mt 
     * @returns 
     */
    static async deleteTransport(id_mt) {
        try {
            const cookies = parseCookieString();
            await axios.delete(process.env.REACT_APP_BACKEND_URL + "/garage/delete", {
                params: {
                    id_mt: id_mt
                },
                headers: {
                    Authorization: cookies.token_type + " " + cookies.access_token
                }
            });

            return true;
        } catch {
            return false;
        }
    }
}