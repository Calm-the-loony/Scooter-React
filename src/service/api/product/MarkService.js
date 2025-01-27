import axios from 'axios';

export default class MarkApiService {
    /**
     * Получение всех марок
     * @returns 
     */
    static async allMarks() {
        try {
            const req = await axios.get(process.env.REACT_APP_BACKEND_URL + "/mark/get_all_marks");
            return req.data;
        } catch {
            return false;
        }
    }
}