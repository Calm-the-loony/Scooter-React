import axios from "axios";
import { AuthService } from "../auth/AuthApiService";


export default class GarageApiService {

    /**
     * Добавление транспорта в гараж
     * @param {*} newTrasport 
     * @returns 
     */
    static async addedGarage(newTrasport) {
        try {
            const req = await axios.post(process.env.REACT_APP_BACKEND_URL + '/garage/create', newTrasport, {
                withCredentials: true
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
            const req = await axios.get(process.env.REACT_APP_BACKEND_URL + "/garage/all", {
                withCredentials: true
            });

            return req.data;
        } catch (er) {
            return false;
        }

    }
}