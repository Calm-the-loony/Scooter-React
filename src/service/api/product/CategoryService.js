import axios from "axios";


export default class CategoryApiService {
    /**
     * Получение всех категорий
     * @returns 
     */
    static async allCategories() {
        try {
            const req = await axios.get(process.env.REACT_APP_BACKEND_URL + "/category/get_all_category");
            return req.data;
        } catch {
            return false;
        }
    }
}