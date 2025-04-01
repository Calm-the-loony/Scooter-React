import axios from "axios";
import { parseCookieString } from "../../token_service";


export class JobsApiService {

    /**
     * Список всех актуальных работ
     * @returns 
     */
    static async allJobs() {
        try {
            const req = await axios.get(process.env.REACT_APP_BACKEND_URL + "/vacancy/all", {});
            return req.data;
        } catch {
            return false;
        }
    }

    /**
     * Создание отклика на вакансию
     * @param {*} userData 
     * @returns 
     */
    static async sendUserRequest(userData, id_vacancy) {
        try {
            const req = await axios.post(process.env.REACT_APP_BACKEND_URL + "/vacancy/create/req", {
                ...userData,
                id_vacancy: id_vacancy
            }, {});
        } catch {
            return false;
        }
    }
}