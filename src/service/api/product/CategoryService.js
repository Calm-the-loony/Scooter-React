import axios from "axios";


export default class CategoryApiService {
    /**
     * Получение всех категорий
     * @returns 
     */
    static async allCategories() {
        const req = await axios.get(process.env.REACT_APP_BACKEND_URL + "/category/all");
        return req.data;
    }

    /**
     * Получение всех подкатегорий определенной категории
     * @param {*} id_category 
     * @returns 
     */
    static async allSubCategories(id_category) {
        try {
            const req = await axios.get(process.env.REACT_APP_BACKEND_URL + "/all/category/"+id_category);
            return req.data;
        } catch {
            return [];
        }
    }
}